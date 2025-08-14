set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_used(p_status text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$--  Check if voucher status is 'used'
BEGIN
    IF p_status <> 'used' THEN
        RAISE NOTICE 'Voucher is refundable, but not used.';
        RETURN;
    END IF;
END;$function$
;


