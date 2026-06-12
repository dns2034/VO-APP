set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.reactivate_voucher(p_voucher_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE product_vouchers
    SET status = 'active',
        updated_at = NOW()
    WHERE id = p_voucher_id;

    RAISE NOTICE 'Voucher reactivated successfully.';
END;
$function$
;


