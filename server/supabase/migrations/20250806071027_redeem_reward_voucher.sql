CREATE OR REPLACE FUNCTION public.redeem_reward_voucher()
RETURNS TRIGGER AS $$
DECLARE
  required_points INT;
  available_points INT;
  remaining INT;
  reward_name TEXT;
  r RECORD;
BEGIN
  -- 1. Get the required points and reward name
  SELECT price, name
  INTO required_points, reward_name
  FROM public.rewards
  WHERE id = NEW.reward_id;

  -- 2. Count the user's active, non-expired points
  SELECT COUNT(*) INTO available_points
  FROM public.points
  WHERE user_id = NEW.user_id
    AND status = 'active'
    AND expires_at > NOW();

  -- 3. Validate if the user has enough points
  IF available_points < required_points THEN
    RAISE EXCEPTION 'You do not have enough points to redeem %', reward_name;
  END IF;

  -- 4. Deduct points from the oldest active ones
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
END;
$$ LANGUAGE plpgsql;
