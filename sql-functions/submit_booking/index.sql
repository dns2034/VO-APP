CREATE OR REPLACE FUNCTION public.submit_booking()
RETURNS TRIGGER AS $$
DECLARE
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_opening TIME WITH TIME ZONE;
  v_closing TIME WITH TIME ZONE;
BEGIN
  -- Step 1: Ensure voucher is present
  IF NEW.product_voucher_id IS NULL THEN
    RAISE EXCEPTION 'A product voucher is required to make a booking.';
  END IF;

  -- Step 2: Get product_id and duration from the voucher
  SELECT * INTO v_product_id, v_product_duration
  FROM get_product_info(NEW.product_voucher_id);

  -- Step 3: Fetch space availability (opening and closing time for the day)
  SELECT * INTO v_opening, v_closing
  FROM get_space_availability(NEW.space_unit_id, NEW.date);

  -- Step 4: Assign start and end time depending on product duration
  SELECT * INTO NEW.start_time, NEW.end_time
  FROM assign_booking_times_by_duration(
    NEW.start_time,
    NEW.end_time,
    v_opening,
    v_closing,
    v_product_duration
  );

  -- Step 5: Check if start and end times are within bounds
  PERFORM validate_time_within_bounds(
    NEW.start_time,
    NEW.end_time,
    v_opening,
    v_closing
  );

  -- Step 6: Check if there's a booking conflict
  PERFORM check_booking_overlap(
    NEW.space_unit_id,
    NEW.date,
    NEW.start_time,
    NEW.end_time
  );

  -- Step 7: Validate voucher status, expiration, user ownership, and duration
  PERFORM verify_product_voucher(
    NEW.booked_by,
    NEW.space_unit_id,
    NEW.start_time,
    NEW.end_time,
    NEW.product_voucher_id
  );

  -- Step 8: Mark voucher as used
  PERFORM set_product_voucher_used(NEW.product_voucher_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
