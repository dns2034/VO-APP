CREATE OR REPLACE FUNCTION public.set_product_voucher_used(
  p_voucher_id UUID
)
RETURNS VOID AS $$
BEGIN
  -- Update the voucher's status to 'used' if it's currently active
  UPDATE public.product_vouchers
  SET status = 'used',
      updated_at = NOW()
  WHERE id = p_voucher_id
    AND status = 'active';

  -- If no row was updated, the voucher either doesn't exist or was already used
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Voucher not found or already used.';
  END IF;
END;
$$ LANGUAGE plpgsql;

