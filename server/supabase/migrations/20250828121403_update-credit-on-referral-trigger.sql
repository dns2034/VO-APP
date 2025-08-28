set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_credit_on_referral()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
  existing_referral uuid;
  user_role text;
begin
  -- Only proceed if referred_by is not NULL
  if new.referred_by is not null then

    -- Check if lead_email already exists for same referred_by
    select id
    into existing_referral
    from public.referrals
    where referred_by = new.referred_by
      and lead_email = new.lead_email
    limit 1;

    if existing_referral is not null then
      -- Log deduplicated referral
      insert into public.event_logs(event_type, payload, status, source)
      values (
        'referral_deduped',
        jsonb_build_object(
          'attempted_referral_id', new.id,
          'existing_referral_id', existing_referral,
          'referred_by', new.referred_by,
          'lead_email', new.lead_email
        ),
        'deduped',
        'create_credit_on_referral'
      );

      -- Cancel the insert (skip adding duplicate row)
      return null;

    else
      begin
        -- Check user role
        select role into user_role
        from public.profiles
        where id = new.referred_by;

        if user_role in ('participant', 'client') then
          -- Insert credit since it's not a duplicate and role matches
          insert into public.credits (user_id)
          values (new.referred_by);

          -- Log success
          insert into public.event_logs(event_type, payload, status, source)
          values (
            'referral_credit',
            jsonb_build_object(
              'referral_id', new.id,
              'referred_by', new.referred_by,
              'lead_email', new.lead_email,
              'role', user_role
            ),
            'success',
            'create_credit_on_referral'
          );
        else
          -- Log skipped because of role
          insert into public.event_logs(event_type, payload, status, source)
          values (
            'referral_credit',
            jsonb_build_object(
              'referral_id', new.id,
              'referred_by', new.referred_by,
              'lead_email', new.lead_email,
              'role', user_role
            ),
            'skipped_role',
            'create_credit_on_referral'
          );

          -- Cancel the insert (skip referral entirely)
          return null;
        end if;

      exception when others then
        -- Log failure
        insert into public.event_logs(event_type, payload, status, source)
        values (
          'referral_credit',
          jsonb_build_object(
            'referral_id', new.id,
            'referred_by', new.referred_by,
            'lead_email', new.lead_email,
            'error', sqlerrm
          ),
          'failure',
          'create_credit_on_referral'
        );
      end;
    end if;

  else
    -- Log skipped (missing referred_by)
    insert into public.event_logs(event_type, payload, status, source)
    values (
      'referral_credit',
      jsonb_build_object(
        'attempted_referral_id', new.id,
        'lead_email', new.lead_email
      ),
      'skipped',
      'create_credit_on_referral'
    );

    return null; -- don’t insert orphaned referral
  end if;

  return new;
end;
$function$
;


