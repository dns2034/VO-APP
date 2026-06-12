drop function if exists "public"."get_product_info"(p_voucher_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_product_info(p_voucher_id uuid)
 RETURNS TABLE(product_id uuid, product_duration smallint)
 LANGUAGE plpgsql
AS $function$---  Extracts product_id and duration from the provided voucher.
BEGIN
  RETURN QUERY
  SELECT p.id, p.duration
  FROM public.product_vouchers pv
  JOIN public.products p ON p.id = pv.product_id
  WHERE pv.id = p_voucher_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid product voucher.';
  END IF;
END;$function$
;


