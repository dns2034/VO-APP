set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_booking_voucher(p_user_id uuid, p_space_unit_id uuid, p_subscription_type text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
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

  -- Step 2: Try to find a matching product based on subscription type
  IF p_subscription_type IS NOT NULL THEN
    SELECT id, duration INTO v_product_id, v_product_duration
    FROM public.products
    WHERE space_id = v_space_id
      AND LOWER(name) LIKE '%' || LOWER(p_subscription_type) || '%'
    ORDER BY duration DESC
    LIMIT 1;
  END IF;

  -- Step 3: If no matching product found, fall back to shortest duration
  IF v_product_id IS NULL THEN
    SELECT id, duration INTO v_product_id, v_product_duration
    FROM public.products
    WHERE space_id = v_space_id
    ORDER BY duration
    LIMIT 1;
  END IF;

  IF v_product_id IS NULL THEN
    RAISE EXCEPTION 'No valid product found for space unit %', p_space_unit_id;
  END IF;

  -- Step 4: Insert the voucher
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

  -- Step 5: Return the voucher ID
  RETURN v_voucher_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_subscription_and_voucher(new bookings)
 RETURNS bookings
 LANGUAGE plpgsql
AS $function$DECLARE
  v_subscription_type TEXT;
  v_generated_voucher_id UUID;
BEGIN
  v_subscription_type := get_user_subscription_type(NEW.booked_by);

  IF LOWER(v_subscription_type) IN ('virtual_office_for_solo', 'virtual_office_for_teams') THEN
    IF NEW.product_voucher_id IS NULL THEN
      -- Generate a voucher using the helper function
      v_generated_voucher_id := generate_booking_voucher(
        NEW.booked_by,
        NEW.space_unit_id,
        v_subscription_type
      );

      NEW.product_voucher_id := v_generated_voucher_id;
    ELSE
      -- Verify the provided voucher
      PERFORM verify_product_voucher(
        NEW.booked_by,
        NEW.space_unit_id,
        NEW.start_time,
        NEW.end_time,
        NEW.product_voucher_id
      );
    END IF;

  ELSIF LOWER(v_subscription_type) = 'business_address_only' THEN
    IF NEW.product_voucher_id IS NULL THEN
      RAISE EXCEPTION 'A valid voucher is required.';
    END IF;
  END IF;

  RETURN NEW;
END;$function$
;


