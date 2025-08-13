set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.redeem_reward_voucher()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  required_points INT;
  available_points INT;
  reward_name TEXT;
  remaining INT;
  r RECORD;
BEGIN
  -- Fill in user_id from auth if missing
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  END IF;

  -- 1. Get the required points from the reward
  SELECT price, name
  INTO required_points, reward_name
  FROM public.rewards
  WHERE id = NEW.reward_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Reward not found.';
  END IF;

  -- 2. Count how many active points the user has (non-expired)
  SELECT COUNT(*) INTO available_points
  FROM public.points
  WHERE user_id = NEW.user_id
    AND status = 'active'
    AND expires_at > NOW();

  -- 3. Check if the user has enough points
  IF available_points < required_points THEN
    RAISE EXCEPTION 'You do not have enough points to redeem %', reward_name;
  END IF;

  -- 4. Deduct the required number of points from the oldest active rows
  remaining := required_points;

  FOR r IN
    SELECT id
    FROM public.points
    WHERE user_id = NEW.user_id
      AND status = 'active'
      AND expires_at > NOW()
    ORDER BY created_at ASC
    FOR UPDATE SKIP LOCKED
  LOOP
    EXIT WHEN remaining <= 0;

    UPDATE public.points
    SET status = 'used'
    WHERE id = r.id;

    remaining := remaining - 1;
  END LOOP;

  RETURN NEW;
END;$function$
;


