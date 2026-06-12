CREATE OR REPLACE FUNCTION public.log_cancellation(p_booking_id uuid, p_user_id uuid, p_remarks text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO booking_cancellations (booking_id, cancelled_by, remarks)
  VALUES (p_booking_id, p_user_id, p_remarks);
END;
$function$
