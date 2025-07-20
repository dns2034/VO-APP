CREATE OR REPLACE FUNCTION redeem_product_voucher()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  required_credits int;
  available_credits int;
  remaining int;
  r record;
BEGIN
  -- 1. Get the required credits from the product
  SELECT price INTO required_credits
  FROM products
  WHERE id = NEW.product_id;

  -- 2. Count how many active credits the user has
  SELECT COUNT(*) INTO available_credits
  FROM public.points
  WHERE user_id = NEW.user_id AND status = 'active';

  -- 3. Check if user has enough
  IF available_credits < required_credits THEN
    RAISE EXCEPTION 'User does not have enough credits. Required: %, Available: %',
      required_credits, available_credits;
  END IF;

  -- 4. Deduct the required number of credits from the oldest active rows
  remaining := required_credits;

  FOR r IN
    SELECT id
    FROM public.credits
    WHERE user_id = NEW.user_id AND status = 'active'
    ORDER BY created_at ASC
    FOR UPDATE SKIP LOCKED
  LOOP
    EXIT WHEN remaining <= 0;

    UPDATE public.credits
    SET status = 'used'
    WHERE id = r.id;

    remaining := remaining - 1;
  END LOOP;

  RETURN NEW;
END;
$$;
