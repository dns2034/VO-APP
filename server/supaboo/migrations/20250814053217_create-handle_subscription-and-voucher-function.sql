set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_subscription_and_voucher(new bookings)
 RETURNS bookings
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_subscription_type TEXT;
  v_space_id UUID;
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_generated_voucher_id UUID;
BEGIN
  v_subscription_type := get_user_subscription_type(NEW.booked_by);

  IF LOWER(v_subscription_type) IN ('virtual_office_for_solo', 'virtual_office_for_teams') THEN
    IF NEW.product_voucher_id IS NULL THEN
      SELECT space_id INTO v_space_id
      FROM public.space_units
      WHERE id = NEW.space_unit_id;

      SELECT id, duration INTO v_product_id, v_product_duration
      FROM public.products
      WHERE space_id = v_space_id
      ORDER BY duration
      LIMIT 1;

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

      NEW.product_voucher_id := v_generated_voucher_id;
    ELSE
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
END;
$function$
;


