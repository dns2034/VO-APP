set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_booking_status_to_cancelled(p_booking_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_current_status TEXT;
BEGIN
  -- Call the helper function
  v_current_status := check_booking_status(p_booking_id);

  -- Check if booking is already cancelled or completed
  IF v_current_status = 'cancelled' OR v_current_status = 'completed' THEN
    RAISE NOTICE 'Booking is already %.', v_current_status;
    RETURN;
  END IF;

  -- Update booking status to cancelled
  UPDATE bookings
  SET status = 'cancelled'
  WHERE id = p_booking_id;

  RAISE NOTICE 'Booking status updated to cancelled.';
END;
$function$
;


