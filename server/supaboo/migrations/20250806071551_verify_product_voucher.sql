CREATE OR REPLACE FUNCTION public.verify_product_voucher(
  p_user_id UUID,
  p_space_unit_id UUID,
  p_start_time TIME WITH TIME ZONE,
  p_end_time TIME WITH TIME ZONE,
  p_voucher_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_voucher_exists BOOLEAN;
BEGIN
  -- Step 1: Basic voucher validity (ownership, active, not expired)
  SELECT EXISTS (
    SELECT 1
    FROM public.product_vouchers
    WHERE id = p_voucher_id
      AND status = 'active'
      AND expiring_at > NOW()
      AND user_id = p_user_id
  ) INTO v_voucher_exists;

  IF NOT v_voucher_exists THEN
    RAISE EXCEPTION 'Selected voucher is not valid or does not exist.';
  END IF;

  -- Step 2: Get product_id and duration from the voucher
  SELECT * INTO v_product_id, v_product_duration
  FROM get_product_info(p_voucher_id);

  -- Step 3: Check if the voucher’s product matches the selected space unit
  SELECT EXISTS (
    SELECT 1
    FROM public.space_units su
    JOIN public.spaces s ON su.space_id = s.id
    WHERE su.id = p_space_unit_id
      AND s.id = (
        SELECT space_id
        FROM public.products
        WHERE id = v_product_id
      )
  ) INTO v_voucher_exists;

  IF NOT v_voucher_exists THEN
    RAISE EXCEPTION 'Voucher cannot be used for this space.';
  END IF;

  -- Step 4: Validate that booking duration does not exceed product duration (if needed)
  PERFORM validate_voucher_duration(
    p_start_time,
    p_end_time,
    v_product_duration
  );
END;
$$ LANGUAGE plpgsql;
