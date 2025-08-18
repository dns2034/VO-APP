set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_subscription_vouchers(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_subscription_id uuid;
  v_expires_at timestamptz;
  v_product_id uuid;
  v_amount int;
  v_frequency public.frequency;
  v_counter int;
  v_next_expiry timestamptz;
  v_period_start timestamptz;
BEGIN
  -- Step 1: Find the user's active subscription
  SELECT us.subscription_id, us.expires_at
  INTO v_subscription_id, v_expires_at
  FROM public.user_subscriptions us
  WHERE us.user_id = p_user_id  -- ✅ FIXED: match by user_id, not id
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
    -- Step 2a: calculate period window + expiry based on frequency
    IF v_frequency = 'Daily' THEN
      v_period_start := date_trunc('day', NOW());
      v_next_expiry := v_period_start + interval '1 day';
    ELSIF v_frequency = 'Weekly' THEN
      v_period_start := date_trunc('week', NOW());
      v_next_expiry := v_period_start + interval '7 days';
    ELSIF v_frequency = 'Monthly' THEN
      v_period_start := date_trunc('month', NOW());
      v_next_expiry := v_period_start + interval '1 month';
    ELSIF v_frequency = 'Yearly' THEN
      v_period_start := date_trunc('year', NOW());
      v_next_expiry := v_period_start + interval '1 year';
    ELSIF v_frequency = 'Once' THEN
      v_period_start := NOW(); -- only one period
      v_next_expiry := v_expires_at;
    ELSE
      RAISE EXCEPTION 'Unsupported frequency type: %', v_frequency;
    END IF;

    -- Step 2b: count vouchers already generated in this period
    IF (
      SELECT COUNT(*) 
      FROM public.product_vouchers pv
      WHERE pv.user_id = p_user_id
        AND pv.product_id = v_product_id
        AND pv.created_at >= v_period_start
    ) >= v_amount THEN
      CONTINUE; -- ✅ user already received entitlement this period
    END IF;

    -- Step 2c: insert only missing vouchers (don’t over-generate)
    FOR v_counter IN 1..(v_amount -
      (SELECT COUNT(*) 
       FROM public.product_vouchers pv
       WHERE pv.user_id = p_user_id
         AND pv.product_id = v_product_id
         AND pv.created_at >= v_period_start))
    LOOP
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
END;
$function$
;


