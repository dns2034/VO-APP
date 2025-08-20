set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_booking_with_user()
 RETURNS TABLE(booking_id uuid, booked_by uuid, booking_date date, start_time time with time zone, end_time time with time zone, status booking_status, remarks text, space_unit_id uuid, user_role roles, user_email text, user_created_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  select 
    b.id as booking_id,
    b.booked_by,
    b.date as booking_date,
    b.start_time,
    b.end_time,
    b.status,
    b.remarks,
    b.space_unit_id,
    ur.role as user_role,
    au.email as user_email,
    au.created_at as user_created_at
  from bookings b
  join auth.users au on au.id = b.booked_by
  left join user_roles ur on ur.user_id = b.booked_by
  where b.booked_by = auth.uid();
$function$
;

CREATE OR REPLACE FUNCTION public.submit_booking()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare 
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_opening TIME WITH TIME ZONE;
  v_closing TIME WITH TIME ZONE;
  v_user_role public.roles;
begin
  --  Step 0: Ensure only clients can book
  select user_role
  into v_user_role
  from public.get_booking_with_user()
  where booking_id = new.id;

  if v_user_role is distinct from 'client' then
    raise exception 'Invalid booking access: only clients can submit bookings';
  end if;

  --  Step 1: Prevent booking past date/time
  new := prevent_past_booking(new);

  --  Step 2: Validate subscription rules & voucher (no more auto-gen here)
  new := handle_subscription_and_voucher(new);

  --  Step 3: If voucher is present, get product details
  if new.product_voucher_id is not null then
    select * into v_product_id, v_product_duration
    from get_product_info(new.product_voucher_id);

    --  Step 4: Get space availability for the selected date
    select * into v_opening, v_closing
    from get_space_availability(new.space_unit_id, new.date);

    --  Step 5: Assign correct booking times
    select * into new.start_time, new.end_time
    from assign_booking_times_by_duration(
      new.start_time,
      new.end_time,
      v_opening,
      v_closing,
      v_product_duration
    );

    --  Step 6: Validate time boundaries
    perform validate_time_within_bounds(
      new.start_time,
      new.end_time,
      v_opening,
      v_closing
    );

    --  Step 7: Check for overlapping bookings
    perform check_booking_overlap(
      new.space_unit_id,
      new.date,
      new.start_time,
      new.end_time
    );

    --  Step 8: Validate and mark voucher as used
    perform verify_product_voucher(
      new.booked_by,
      new.space_unit_id,
      new.start_time,
      new.end_time,
      new.product_voucher_id
    );

    perform set_product_voucher_used(new.product_voucher_id);

  else
    --  If voucher is NULL but allowed by subscription,
    -- still enforce basic booking validations
    select * into v_opening, v_closing
    from get_space_availability(new.space_unit_id, new.date);

    perform validate_time_within_bounds(
      new.start_time,
      new.end_time,
      v_opening,
      v_closing
    );

    perform check_booking_overlap(
      new.space_unit_id,
      new.date,
      new.start_time,
      new.end_time
    );
  end if;

  return new;
end;
$function$
;


