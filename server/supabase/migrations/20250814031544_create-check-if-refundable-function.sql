set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_refundable(p_is_refundable boolean)
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN
-- Check if product voucher is refundable
    IF NOT p_is_refundable THEN
        RAISE NOTICE 'Voucher is non-refundable.';
        RETURN;
    END IF;
END;$function$
;


