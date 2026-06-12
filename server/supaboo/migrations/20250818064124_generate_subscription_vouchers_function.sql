drop function if exists "public"."generate_booking_voucher"(p_user_id uuid, p_space_unit_id uuid);

drop function if exists "public"."generate_booking_voucher"(p_user_id uuid, p_space_unit_id uuid, p_subscription_type text);

alter table "public"."subscription_products" alter column "frequency" drop default;

alter type "public"."frequency" rename to "frequency__old_version_to_be_dropped";

create type "public"."frequency" as enum ('Weekly', 'Daily', 'Monthly', 'Quarterly', 'Yearly');

alter table "public"."subscription_products" alter column frequency type "public"."frequency" using frequency::text::"public"."frequency";

alter table "public"."subscription_products" alter column "frequency" set default 'Weekly'::frequency;

drop type "public"."frequency__old_version_to_be_dropped";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_subscription_vouchers(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  v_subscription_id uuid;
  v_expires_at timestamptz;
  v_product_id uuid;
  v_amount int;
  v_frequency public.frequency;
  v_counter int;
  v_next_expiry timestamptz;
BEGIN
  -- Step 1: Find the user's active subscription
  SELECT us.subscription_id, us.expires_at
  INTO v_subscription_id, v_expires_at
  FROM public.user_subscriptions us
  WHERE us.id = p_user_id
    AND (us.expires_at IS NULL OR us.expires_at > NOW())
  ORDER BY us.started_at DESC
  LIMIT 1;

  IF v_subscription_id IS NULL THEN
    RAISE NOTICE 'User % has no active subscription. Skipping voucher generation.', p_user_id;
    RETURN;
  END IF;

  -- Step 2: Loop through subscription entitlements
  FOR v_product_id, v_amount, v_frequency IN
    SELECT sp.product_id, sp.amount, sp.frequency
    FROM public.subscription_products sp
    WHERE sp.subscription_id = v_subscription_id
  LOOP
    -- Step 2a: expiry calculation based on frequency
    IF v_frequency = 'Daily' THEN
      v_next_expiry := NOW() + interval '1 day';
    ELSIF v_frequency = 'Weekly' THEN
      v_next_expiry := NOW() + interval '7 days';
    ELSIF v_frequency = 'Monthly' THEN
      v_next_expiry := NOW() + interval '30 days';
    ELSIF v_frequency = 'Yearly' THEN
      v_next_expiry := NOW() + interval '365 days';
    ELSIF v_frequency = 'Once' THEN
      v_next_expiry := v_expires_at;
    ELSE
      RAISE EXCEPTION 'Unsupported frequency type: %', v_frequency;
    END IF;

    -- Step 2b: check if user already has enough active vouchers
    IF (
      SELECT COUNT(*) 
      FROM public.product_vouchers pv
      WHERE pv.user_id = p_user_id
        AND pv.product_id = v_product_id
        AND pv.status = 'active'
        AND pv.expiring_at > NOW()
    ) >= v_amount THEN
      CONTINUE; -- skip, user already has entitlement
    END IF;

    -- Step 2c: insert vouchers up to entitlement
    FOR v_counter IN 1..v_amount LOOP
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
        v_next_expiry
      );
    END LOOP;

  END LOOP;

  RAISE NOTICE 'Generated vouchers for user % subscription %', p_user_id, v_subscription_id;
END;$function$
;


