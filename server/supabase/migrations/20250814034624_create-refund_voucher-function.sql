set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.refund_voucher(p_voucher_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_status text;
    v_is_refundable boolean;
BEGIN
    -- Step 1: Get voucher info
    SELECT gi.v_status, gi.v_is_refundable
    INTO v_status, v_is_refundable
    FROM get_voucher_info(p_voucher_id) gi;

    IF v_status IS NULL THEN
        RAISE EXCEPTION 'Voucher not found.';
    END IF;

    -- Step 2: Check if refundable
    PERFORM check_refundable(v_is_refundable);

    -- Step 3: Check if used
    PERFORM check_used(v_status);

    -- Step 4: Reactivate voucher
    PERFORM reactivate_voucher(p_voucher_id);
END;
$function$
;


