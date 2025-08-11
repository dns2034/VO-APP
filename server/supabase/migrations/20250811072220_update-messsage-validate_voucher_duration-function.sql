set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.validate_voucher_duration(p_start time with time zone, p_end time with time zone, p_duration smallint)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  v_actual_duration INTERVAL;
BEGIN
  -- Only check duration for vouchers that are time-based (less than 24 hours)
  IF p_duration < 24 THEN
    v_actual_duration := p_end::time - p_start::time;

    IF EXTRACT(EPOCH FROM v_actual_duration) > (p_duration * 3600) THEN
      RAISE EXCEPTION 'Booking exceeds % hour(s).', p_duration;
    END IF;
  END IF;
END;$function$
;


