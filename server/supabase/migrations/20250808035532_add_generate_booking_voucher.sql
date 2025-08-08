set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_booking_voucher(p_user_id uuid, p_space_unit_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$-- for automated generation of bokings [mostly for Virtual Office Solo/teams only]

DECLARE
  v_space_id UUID;
  v_product_id UUID;
  v_product_duration INTERVAL;
  v_voucher_id UUID;
BEGIN
  -- Step 1: Get the space_id from the space_unit
  SELECT space_id INTO v_space_id
  FROM public.space_units
  WHERE id = p_space_unit_id;

  -- Step 2: Choose the most appropriate product for that space
  -- Currently picks the shortest duration (you can refine this)
  SELECT id, duration INTO v_product_id, v_product_duration
  FROM public.products
  WHERE space_id = v_space_id
  ORDER BY duration
  LIMIT 1;

  -- Step 3: Insert the voucher (code is handled via trigger)
  INSERT INTO public.product_vouchers (
    user_id,
    product_id,
    status,
    is_refundable,
    expiring_at
  )
  VALUES (
    p_user_id,
    v_product_id,
    'active',
    FALSE,
    NOW() + INTERVAL '30 days'
  )
  RETURNING id INTO v_voucher_id;

  -- Step 4: Return the voucher ID
  RETURN v_voucher_id;
END;$function$
;


