CREATE OR REPLACE FUNCTION public.validate_booking(p_booking_id uuid, p_user_id uuid)
 RETURNS TABLE(result_start_time time with time zone, result_booking_date date, result_voucher_id uuid, result_status text, result_created_at timestamp with time zone)
 LANGUAGE plpgsql
AS $function$
DECLARE
  booking_owner UUID;
BEGIN
  SELECT 
    booked_by, 
    start_time, 
    date, 
    product_voucher_id, 
    status, 
    created_at
  INTO 
    booking_owner, 
    result_start_time, 
    result_booking_date, 
    result_voucher_id, 
    result_status, 
    result_created_at
  FROM bookings
  WHERE id = p_booking_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found.';
  END IF;

  IF booking_owner <> p_user_id THEN
    RAISE EXCEPTION 'You can only access your own bookings.';
  END IF;

  RETURN NEXT;
END;
$function$
