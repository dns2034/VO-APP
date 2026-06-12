CREATE OR REPLACE FUNCTION public.check_booking_cancellation_window(p_created_at timestamp with time zone)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$BEGIN
-- Check if the cancellation is still doable. Can only cancel within 2 days after booking. 
  RETURN now() <= (p_created_at + INTERVAL '48 hours');
END;$function$
