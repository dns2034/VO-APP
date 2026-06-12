set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.submit_booking()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_opening TIME WITH TIME ZONE;
  v_closing TIME WITH TIME ZONE;
  v_subscription_type TEXT;
  v_space_id UUID;
  v_generated_voucher_id UUID;
BEGIN

-- Step 0: Prevent booking past date/time
IF NEW.start_time IS NOT NULL THEN
  IF (NEW.date + NEW.start_time) < NOW() THEN
    RAISE EXCEPTION 'Cannot book for a past date/time.';
  END IF;
ELSE
  -- Coworking or duration-based bookings without explicit start_time
  IF NEW.date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Cannot book for a past date.';
  END IF;
END IF;

  -- Step 1: Get the user's subscription type
  v_subscription_type := get_user_subscription_type(NEW.booked_by);

  -- Step 2: Determine behavior based on subscription
IF LOWER(v_subscription_type) IN ('virtual_office_for_solo', 'virtual_office_for_teams') THEN
  IF NEW.product_voucher_id IS NULL THEN
    -- Auto-generate a non-refundable voucher

    -- Get space_id from the space unit
    SELECT space_id INTO v_space_id
    FROM public.space_units
    WHERE id = NEW.space_unit_id;

    -- Choose a product for that space (e.g., 1-hour or 1-day)
    SELECT id, duration INTO v_product_id, v_product_duration
    FROM public.products
    WHERE space_id = v_space_id
    ORDER BY duration
    LIMIT 1;

    -- Insert a non-refundable voucher
    INSERT INTO public.product_vouchers (
      code, user_id, product_id, status, is_refundable, expiring_at
    )
    VALUES (
      generate_voucher_code(),
      NEW.booked_by,
      v_product_id,
      'active',
      false,
      NOW() + interval '30 days'
    )
    RETURNING id INTO v_generated_voucher_id;

    -- Attach voucher to booking
    NEW.product_voucher_id := v_generated_voucher_id;

  ELSE
    -- User manually provided a voucher, validate it
    PERFORM verify_product_voucher(
      NEW.booked_by,
      NEW.space_unit_id,
      NEW.start_time,
      NEW.end_time,
      NEW.product_voucher_id
    );
  END IF;

ELSIF LOWER(v_subscription_type) = 'business_address_only' THEN
  -- Require a voucher for BAO users
  IF NEW.product_voucher_id IS NULL THEN
    RAISE EXCEPTION 'A valid voucher is required.';
  END IF;
END IF;

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
END;$function$
;


