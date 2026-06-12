drop function if exists "public"."reactivate_voucher_if_used"(p_voucher_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.submit_booking()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_opening TIME WITH TIME ZONE;
  v_closing TIME WITH TIME ZONE;
BEGIN
  -- Step 0: Prevent booking past date/time
  NEW := prevent_past_booking(NEW);

  -- Step 1 & 2: Handle subscription logic and voucher assignment
  NEW := handle_subscription_and_voucher(NEW);

  -- Step 3: Get product duration from the voucher
  SELECT * INTO v_product_id, v_product_duration
  FROM get_product_info(NEW.product_voucher_id);

  -- Step 4: Get space availability for the selected date
  SELECT * INTO v_opening, v_closing
  FROM get_space_availability(NEW.space_unit_id, NEW.date);

  -- Step 5: Assign correct booking times
  SELECT * INTO NEW.start_time, NEW.end_time
  FROM assign_booking_times_by_duration(
    NEW.start_time,
    NEW.end_time,
    v_opening,
    v_closing,
    v_product_duration
  );

  -- Step 6: Validate time boundaries
  PERFORM validate_time_within_bounds(
    NEW.start_time,
    NEW.end_time,
    v_opening,
    v_closing
  );

  -- Step 7: Check for overlapping bookings
  PERFORM check_booking_overlap(
    NEW.space_unit_id,
    NEW.date,
    NEW.start_time,
    NEW.end_time
  );

  -- Step 8: If using a voucher, validate and mark as used
  IF NEW.product_voucher_id IS NOT NULL THEN
    PERFORM verify_product_voucher(
      NEW.booked_by,
      NEW.space_unit_id,
      NEW.start_time,
      NEW.end_time,
      NEW.product_voucher_id
    );

    PERFORM set_product_voucher_used(NEW.product_voucher_id);
  END IF;

  RETURN NEW;
END;
$function$
;


