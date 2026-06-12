set check_function_bodies = off;

drop trigger if exists "trg_create_credit_on_referral" on "public"."referrals";

drop index if exists "public"."referrals_referred_by_lead_email_uidx";

CREATE INDEX referrals_referred_by_lead_email_idx ON public.referrals USING btree (referred_by, lead_email);

CREATE OR REPLACE FUNCTION public.dedupe_referral(p_referred_by uuid, p_lead_email text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
  exists_count int;
BEGIN
  SELECT COUNT(*) INTO exists_count
  FROM referrals
  WHERE referred_by = p_referred_by AND lead_email = p_lead_email;

  IF exists_count > 0 THEN
    INSERT INTO public.event_logs(event_type, payload, status, source)
    VALUES (
      'referral_dedupe',
      jsonb_build_object('referred_by', p_referred_by, 'lead_email', p_lead_email),
      'duplicate',
      'dedupe_referral'
    );
    RETURN false;
  ELSE
    RETURN true;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.deduplicate_referral(p_user_id uuid, p_email text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM referrals WHERE user_id = p_user_id AND email = p_email
  ) INTO v_exists;

  IF v_exists THEN
    INSERT INTO public.event_logs (event_type, payload, status, source)
    VALUES (
      'deduplication',
      jsonb_build_object('user_id', p_user_id, 'email', p_email),
      'duplicate',
      'deduplicate_referral'
    );
    RETURN false;
  ELSE
    INSERT INTO public.event_logs (event_type, payload, status, source)
    VALUES (
      'deduplication',
      jsonb_build_object('user_id', p_user_id, 'email', p_email),
      'unique',
      'deduplicate_referral'
    );
    RETURN true;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.replay_failed_referrals()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT * FROM referrals r
    WHERE NOT EXISTS (
      SELECT 1 FROM credits c WHERE c.user_id = r.referred_by
    )
  LOOP
    BEGIN
      INSERT INTO public.credits (user_id) VALUES (r.referred_by);

      INSERT INTO public.event_logs(event_type, payload, status, source)
      VALUES (
        'referral_replay',
        jsonb_build_object('referral_id', r.id, 'referred_by', r.referred_by),
        'success',
        'replay_failed_referrals'
      );
    EXCEPTION WHEN OTHERS THEN
      INSERT INTO public.event_logs(event_type, payload, status, source)
      VALUES (
        'referral_replay',
        jsonb_build_object('referral_id', r.id, 'referred_by', r.referred_by, 'error', SQLERRM),
        'failure',
        'replay_failed_referrals'
      );
    END;
  END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_credit_on_referral()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
  existing_referral uuid;
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
          'attempted_referral_id', new.id, -- attempted insert
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
        -- Insert credit since it's not a duplicate
        insert into public.credits (user_id)
        values (new.referred_by);

        -- Log success
        insert into public.event_logs(event_type, payload, status, source)
        values (
          'referral_credit',
          jsonb_build_object(
            'referral_id', new.id,
            'referred_by', new.referred_by,
            'lead_email', new.lead_email
          ),
          'success',
          'create_credit_on_referral'
        );

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

CREATE TRIGGER trg_create_credit_on_referral BEFORE INSERT ON public.referrals FOR EACH ROW EXECUTE FUNCTION create_credit_on_referral();


