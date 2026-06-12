CREATE OR REPLACE FUNCTION public.set_product_voucher_code()
RETURNS TRIGGER AS $$
DECLARE
  try_code TEXT;
BEGIN
  -- If a code was already provided, keep it
  IF NEW.code IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Loop to generate a unique code that doesn't already exist
  LOOP
    try_code := generate_voucher_code();  -- Assumes this helper function exists

    -- Check uniqueness
    IF NOT EXISTS (
      SELECT 1 FROM public.product_vouchers WHERE code = try_code
    ) THEN
      NEW.code := try_code;
      EXIT;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
