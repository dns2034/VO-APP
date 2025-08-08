set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.redeem_product_voucher()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  required_credits INT;
  available_credits INT;
  product_name TEXT;
  remaining INT;
  r RECORD;
BEGIN
  -- 1. Get the required credits from the product
  SELECT price, name
  INTO required_credits, product_name
  FROM public.products
  WHERE id = NEW.product_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found.';
  END IF;

  -- 2. Count how many active credits the user has (non-expired)
  SELECT COUNT(*) INTO available_credits
  FROM public.credits
  WHERE user_id = NEW.user_id
    AND status = 'active'
    AND expires_at > NOW();

  -- 3. Check if the user has enough credits
  IF available_credits < required_credits THEN
    RAISE EXCEPTION 'You do not have enough credits to redeem %', product_name;
  END IF;

  -- 4. Deduct the required number of credits from the oldest active rows
  remaining := required_credits;

  FOR r IN
    SELECT id
    FROM public.credits
    WHERE user_id = NEW.user_id
      AND status = 'active'
      AND expires_at > NOW()
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
$function$
;


