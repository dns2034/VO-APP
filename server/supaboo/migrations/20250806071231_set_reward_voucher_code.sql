CREATE OR REPLACE FUNCTION public.set_reward_voucher_code()
RETURNS TRIGGER AS $$
DECLARE
  try_code TEXT;
BEGIN
  -- If a code was manually provided, keep it
  IF NEW.code IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Loop to generate a unique code
  LOOP
    try_code := generate_voucher_code();  -- Assumes this helper function exists

    -- Ensure the generated code doesn't already exist in reward_vouchers
    IF NOT EXISTS (
      SELECT 1 FROM public.reward_vouchers WHERE code = try_code
    ) THEN
      NEW.code := try_code;
      EXIT;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
