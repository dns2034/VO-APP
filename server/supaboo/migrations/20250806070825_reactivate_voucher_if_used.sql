CREATE OR REPLACE FUNCTION public.reactivate_voucher_if_used(p_voucher_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  v_status TEXT;
  v_is_refundable BOOLEAN;
BEGIN
  -- Step 1: Check if voucher exists and get its status & refundability
  SELECT status, is_refundable
  INTO v_status, v_is_refundable
  FROM product_vouchers
  WHERE id = p_voucher_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Voucher not found.';
  END IF;

  -- Step 2: Check if refundable
  IF NOT v_is_refundable THEN
    RAISE NOTICE 'Voucher is non-refundable.';
    RETURN;
  END IF;

  -- Step 3: Check if used
  IF v_status <> 'used' THEN
    RAISE NOTICE 'Voucher is refundable, but not used.';
    RETURN;
  END IF;

  -- Step 4: Reactivate voucher
  UPDATE product_vouchers
  SET status = 'active',
      updated_at = NOW()
  WHERE id = p_voucher_id;

  RAISE NOTICE 'Voucher reactivated successfully.';
END;$function$
