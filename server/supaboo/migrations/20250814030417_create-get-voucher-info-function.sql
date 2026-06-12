set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_voucher_info(p_voucher_id uuid)
 RETURNS TABLE(v_status text, v_is_refundable boolean)
 LANGUAGE sql
AS $function$-- Get voucher info
    SELECT status::text, is_refundable
    FROM product_vouchers
    WHERE id = p_voucher_id;$function$
;


