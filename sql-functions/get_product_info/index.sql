CREATE OR REPLACE FUNCTION get_product_info(
  p_voucher_id UUID
)
RETURNS TABLE(product_id UUID, duration INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.duration
  FROM public.product_vouchers pv
  JOIN public.products p ON p.id = pv.product_id
  WHERE pv.id = p_voucher_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid product voucher.';
  END IF;
END;
$$;
