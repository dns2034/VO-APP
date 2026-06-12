set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_points_on_booking_complete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  v_user_id uuid;
  v_product_id uuid;
  v_required_credits int;
BEGIN
  -- Only run when status changes TO 'completed'
  IF NEW.status = 'completed'
     AND OLD.status IS DISTINCT FROM 'completed'
     AND NOT EXISTS (
         SELECT 1 FROM public.points WHERE booking_id = NEW.id
     ) THEN

    -- Must have a voucher
    IF NEW.product_voucher_id IS NULL THEN
      RAISE NOTICE 'No voucher for booking %, skipping points.', NEW.id;
      RETURN NEW;
    END IF;

    -- Get user and product from voucher
    SELECT pv.user_id, pv.product_id
    INTO v_user_id, v_product_id
    FROM public.product_vouchers pv
    WHERE pv.id = NEW.product_voucher_id;

    IF v_user_id IS NULL OR v_product_id IS NULL THEN
      RAISE NOTICE 'Voucher data missing for booking %, skipping.', NEW.id;
      RETURN NEW;
    END IF;

    -- ✅ New check: booking must belong to same user
    PERFORM 1
    FROM public.bookings
    WHERE id = NEW.id
      AND booked_by = v_user_id;

    IF NOT FOUND THEN
      RAISE NOTICE 'Booking % does not belong to user %, skipping points.', NEW.id, v_user_id;
      RETURN NEW;
    END IF;

    -- Get credits required for the product
    SELECT price
    INTO v_required_credits
    FROM public.products
    WHERE id = v_product_id;

    IF v_required_credits IS NULL OR v_required_credits <= 0 THEN
      RAISE NOTICE 'Product price is zero or null, skipping.';
      RETURN NEW;
    END IF;

    -- Award points (1 row per point)
    INSERT INTO public.points (user_id, expires_at, status, booking_id)
    SELECT v_user_id, NOW() + interval '30 days', 'active', NEW.id
    FROM generate_series(1, v_required_credits);

    RAISE NOTICE 'Awarded % points to user % for booking %.',
                 v_required_credits, v_user_id, NEW.id;
  END IF;

  RETURN NEW;
END;$function$
;


