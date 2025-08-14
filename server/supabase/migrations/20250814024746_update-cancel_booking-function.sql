set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.cancel_booking(p_booking_id uuid, p_user_id uuid, p_remarks text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$DECLARE
  v_start TIME WITH TIME ZONE;
  v_date DATE;
  v_voucher UUID;
  v_stat TEXT;
  v_created TIMESTAMPTZ;
BEGIN
  -- Avoid name conflicts by aliasing returned columns
  SELECT 
    v.result_start_time, 
    v.result_booking_date, 
    v.result_voucher_id, 
    v.result_status, 
    v.result_created_at
  INTO 
    v_start, 
    v_date, 
    v_voucher, 
    v_stat, 
    v_created
  FROM validate_booking(p_booking_id, p_user_id) v;

  -- 2. Check if booking is cancellable
  PERFORM is_booking_cancellable(v_stat);

  -- 3. Check if within 48-hour window
  IF NOT check_booking_cancellation_window(v_created) THEN
    RAISE EXCEPTION 'Booking can only be cancelled within 48 hours of booking time.';
  END IF;

  -- 4. Reactivate voucher if used
  PERFORM refund_voucher(v_voucher);

  -- 5. Log the cancellation
  PERFORM log_cancellation(p_booking_id, p_user_id, p_remarks);

  -- 6. Update booking
  PERFORM update_booking_status_to_cancelled(p_booking_id);

  RETURN 'Booking cancelled successfully.';
END;$function$
;


