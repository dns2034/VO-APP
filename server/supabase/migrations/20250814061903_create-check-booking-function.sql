set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_booking_status(p_booking_id uuid)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_current_status TEXT;
BEGIN
  SELECT status INTO v_current_status
  FROM bookings
  WHERE id = p_booking_id;

  RETURN v_current_status;
END;
$function$
;


