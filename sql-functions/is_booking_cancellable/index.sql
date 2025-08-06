CREATE OR REPLACE FUNCTION public.is_booking_cancellable(p_status text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$BEGIN
  IF p_status = 'cancelled' OR p_status = 'completed' THEN
    RAISE EXCEPTION 'This booking cannot be cancelled.';
  END IF;
  RETURN TRUE;
END;$function$
