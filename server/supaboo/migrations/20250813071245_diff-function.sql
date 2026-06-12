set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.cancel_booking(p_booking_id uuid, p_user_id uuid, p_remarks text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$DECLARE
  v_start TIME WITH TIME ZONE;
  v_date DATE;
  v_voucher UUID;
  v_stat TEXT;
  v_created TIMESTAMPTZ;
BEGIN
  -- Avoid name conflicts by aliasing returned columns
  SELECT 
    v.result_start_time, 
    v.result_booking_date, 
    v.result_voucher_id, 
    v.result_status, 
    v.result_created_at
  INTO 
    v_start, 
    v_date, 
    v_voucher, 
    v_stat, 
    v_created
  FROM validate_booking(p_booking_id, p_user_id) v;

  -- 2. Check if booking is cancellable
  PERFORM is_booking_cancellable(v_stat);

  -- 3. Check if within 48-hour window
  IF NOT check_booking_cancellation_window(v_created) THEN
    RAISE EXCEPTION 'Booking can only be cancelled within 48 hours of booking time.';
  END IF;

  -- 4. Reactivate voucher if used
  PERFORM reactivate_voucher_if_used(v_voucher);

  -- 5. Log the cancellation
  PERFORM log_cancellation(p_booking_id, p_user_id, p_remarks);

  -- 6. Update booking
  PERFORM update_booking_status_to_cancelled(p_booking_id);

  RETURN 'Booking cancelled successfully.';
END;$function$
;

CREATE OR REPLACE FUNCTION public.check_booking_cancellation_window(p_created_at timestamp with time zone)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$BEGIN
-- Check if the cancellation is still doable. Can only cancel within 2 days after booking. 
  RETURN now() <= (p_created_at + INTERVAL '48 hours');
END;$function$
;

CREATE OR REPLACE FUNCTION public.check_booking_overlap(p_space_unit_id uuid, p_date date, p_start time with time zone, p_end time with time zone)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  overlapping_count INT;
BEGIN
  -- Only check for overlaps if the booking is time-based (e.g., Meeting Rooms)
  IF p_start IS NOT NULL AND p_end IS NOT NULL THEN
    SELECT COUNT(*) INTO overlapping_count
    FROM public.bookings
    WHERE space_unit_id = p_space_unit_id
      AND date = p_date
      AND status != 'cancelled'  -- Ignore cancelled bookings
      AND start_time IS NOT NULL
      AND end_time IS NOT NULL
      AND (p_start, p_end) OVERLAPS (start_time, end_time);

    IF overlapping_count > 0 THEN
      RAISE EXCEPTION 'Booking overlaps with an existing one.';
    END IF;
  END IF;

  -- No overlap check for full-day (coworking/VO) bookings
END;$function$
;

CREATE OR REPLACE FUNCTION public.generate_booking_voucher(p_user_id uuid, p_space_unit_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$-- for automated generation of bokings [mostly for Virtual Office Solo/teams only]

DECLARE
  v_space_id UUID;
  v_product_id UUID;
  v_product_duration INTERVAL;
  v_voucher_id UUID;
BEGIN
  -- Step 1: Get the space_id from the space_unit
  SELECT space_id INTO v_space_id
  FROM public.space_units
  WHERE id = p_space_unit_id;

  -- Step 2: Choose the most appropriate product for that space
  -- Currently picks the shortest duration (you can refine this)
  SELECT id, duration INTO v_product_id, v_product_duration
  FROM public.products
  WHERE space_id = v_space_id
  ORDER BY duration
  LIMIT 1;

  -- Step 3: Insert the voucher (code is handled via trigger)
  INSERT INTO public.product_vouchers (
    user_id,
    product_id,
    status,
    is_refundable,
    expiring_at
  )
  VALUES (
    p_user_id,
    v_product_id,
    'active',
    FALSE,
    NOW() + INTERVAL '30 days'
  )
  RETURNING id INTO v_voucher_id;

  -- Step 4: Return the voucher ID
  RETURN v_voucher_id;
END;$function$
;

CREATE OR REPLACE FUNCTION public.generate_voucher_code()
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN upper(SUBSTRING(md5(random()::text), 1, 8));
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_product_info(p_voucher_id uuid)
 RETURNS TABLE(product_id uuid, product_duration smallint)
 LANGUAGE plpgsql
AS $function$---  Extracts product_id and duration from the provided voucher.
BEGIN
  RETURN QUERY
  SELECT p.id, p.duration
  FROM public.product_vouchers pv
  JOIN public.products p ON p.id = pv.product_id
  WHERE pv.id = p_voucher_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid product voucher.';
  END IF;
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_space_availability(p_space_unit_id uuid, p_date date)
 RETURNS TABLE(opening_time time with time zone, closing_time time with time zone)
 LANGUAGE plpgsql
AS $function$--- Fetches the space's available opening_time and closing_time for the date.
BEGIN

  -- Debug: show input values
  RAISE NOTICE 'Input values → space_unit_id: %, date: %', p_space_unit_id, p_date;
  
  RETURN QUERY
  SELECT sa.opening_time, sa.closing_time
  FROM public.space_units su
  JOIN public.spaces s ON su.space_id = s.id
  JOIN public.space_availability sa ON sa.space_id = s.id
  WHERE su.id = p_space_unit_id
    AND sa.date = p_date
  LIMIT 1;

  -- If no availability is found for that day, raise an error
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No availability found for the selected date.';
  END IF;
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_total_active_credits(p_user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_count INTEGER;
BEGIN
  -- Count all active, non-expired credits for the user
  SELECT COUNT(*) INTO v_count
  FROM public.credits
  WHERE user_id = p_user_id
    AND status = 'active'
    AND expires_at > NOW();

  RETURN v_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_subscription_type(p_user_id uuid)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_subscription_type TEXT;
BEGIN
  SELECT s.subscriptions_type
  INTO v_subscription_type
  FROM public.user_subscriptions us
  JOIN public.subscriptions s ON us.subscription_id = s.id
  WHERE us.id = p_user_id
    AND (us.expires_at IS NULL OR us.expires_at > NOW())
  ORDER BY us.started_at DESC
  LIMIT 1;

  RETURN v_subscription_type;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_booking_cancellable(p_status text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$BEGIN
  IF p_status = 'cancelled' OR p_status = 'completed' THEN
    RAISE EXCEPTION 'This booking cannot be cancelled.';
  END IF;
  RETURN TRUE;
END;$function$
;

CREATE OR REPLACE FUNCTION public.log_cancellation(p_booking_id uuid, p_user_id uuid, p_remarks text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO booking_cancellations (booking_id, cancelled_by, remarks)
  VALUES (p_booking_id, p_user_id, p_remarks);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reactivate_voucher_if_used(p_voucher_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  v_status TEXT;
  v_is_refundable BOOLEAN;
BEGIN
  -- Step 1: Check if voucher exists and get its status & refundability
  SELECT status, is_refundable
  INTO v_status, v_is_refundable
  FROM product_vouchers
  WHERE id = p_voucher_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Voucher not found.';
  END IF;

  -- Step 2: Check if refundable
  IF NOT v_is_refundable THEN
    RAISE NOTICE 'Voucher is non-refundable.';
    RETURN;
  END IF;

  -- Step 3: Check if used
  IF v_status <> 'used' THEN
    RAISE NOTICE 'Voucher is refundable, but not used.';
    RETURN;
  END IF;

  -- Step 4: Reactivate voucher
  UPDATE product_vouchers
  SET status = 'active',
      updated_at = NOW()
  WHERE id = p_voucher_id;

  RAISE NOTICE 'Voucher reactivated successfully.';
END;$function$
;

CREATE OR REPLACE FUNCTION public.set_product_voucher_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  try_code TEXT;
BEGIN
  -- If a code was already provided, keep it
  IF NEW.code IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Loop to generate a unique code that doesn't already exist
  LOOP
    try_code := generate_voucher_code();  -- Assumes this helper function exists

    -- Check uniqueness
    IF NOT EXISTS (
      SELECT 1 FROM public.product_vouchers WHERE code = try_code
    ) THEN
      NEW.code := try_code;
      EXIT;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_product_voucher_used(p_voucher_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Update the voucher's status to 'used' if it's currently active
  UPDATE public.product_vouchers
  SET status = 'used',
      updated_at = NOW()
  WHERE id = p_voucher_id
    AND status = 'active';

  -- If no row was updated, the voucher either doesn't exist or was already used
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Voucher not found or already used.';
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_reward_voucher_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  try_code TEXT;
BEGIN
  -- If a code was manually provided, keep it
  IF NEW.code IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Loop to generate a unique code
  LOOP
    try_code := generate_voucher_code();  -- Assumes this helper function exists

    -- Ensure the generated code doesn't already exist in reward_vouchers
    IF NOT EXISTS (
      SELECT 1 FROM public.reward_vouchers WHERE code = try_code
    ) THEN
      NEW.code := try_code;
      EXIT;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.validate_time_within_bounds(p_start time with time zone, p_end time with time zone, p_open time with time zone, p_close time with time zone)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Ensure the booking start time is not earlier than the space opening time
  IF p_start < p_open THEN
    RAISE EXCEPTION 'Opening time is at %.', p_open;
  END IF;

  -- Ensure the booking end time is not later than the space closing time
  IF p_end > p_close THEN
    RAISE EXCEPTION 'Closing time is at %.', p_close;
  END IF;
END;
$function$
;


