CREATE OR REPLACE FUNCTION redeem_reward_voucher()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  required_points int;
  available_points int;
  remaining int;
  r record;
BEGIN
  -- 1. Get the required points from the reward
  SELECT price INTO required_points
  FROM rewards
  WHERE id = NEW.reward_id;

  -- 2. Count how many active points the user has
  SELECT COUNT(*) INTO available_points
  FROM public.points
  WHERE user_id = NEW.user_id AND status = 'active';

  -- 3. Check if user has enough
  IF available_points < required_points THEN
    RAISE EXCEPTION 'User does not have enough points. Required: %, Available: %',
      required_points, available_points;
  END IF;

  -- 4. Deduct the required number of points from the oldest active rows
  remaining := required_points;

  FOR r IN
    SELECT id
    FROM public.points
    WHERE user_id = NEW.user_id AND status = 'active'
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
$$;
