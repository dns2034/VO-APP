set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_subscription_and_voucher(new bookings)
 RETURNS bookings
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_subscription_type TEXT;
  v_requires_voucher BOOLEAN;
BEGIN
  -- Get the user's subscription type
  v_subscription_type := get_user_subscription_type(NEW.booked_by);

  -- If user has no subscription, enforce voucher-only booking
  IF v_subscription_type IS NULL THEN
    IF NEW.product_voucher_id IS NULL THEN
      RAISE EXCEPTION 'You must have a valid subscription or voucher to book.';
    ELSE
      PERFORM verify_product_voucher(
        NEW.booked_by,
        NEW.space_unit_id,
        NEW.start_time,
        NEW.end_time,
        NEW.product_voucher_id
      );
    END IF;
    RETURN NEW;
  END IF;

  -- Otherwise, check if subscription has bundled products
  SELECT EXISTS (
    SELECT 1
    FROM user_subscriptions us
    JOIN subscription_products sp ON sp.subscription_id = us.subscription_id
    WHERE us.id = NEW.booked_by
      AND (us.expires_at IS NULL OR us.expires_at > NOW())
  ) INTO v_requires_voucher;

  -- If plan is voucher-driven or business_address_only, enforce voucher presence
  IF v_requires_voucher OR v_subscription_type = 'business_address_only' THEN
    IF NEW.product_voucher_id IS NULL THEN
      RAISE EXCEPTION 'A valid voucher is required for this subscription type.';
    ELSE
      PERFORM verify_product_voucher(
        NEW.booked_by,
        NEW.space_unit_id,
        NEW.start_time,
        NEW.end_time,
        NEW.product_voucher_id
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$function$
;


