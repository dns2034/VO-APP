set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.assign_booking_times_by_duration(p_start time with time zone, p_end time with time zone, p_open time with time zone, p_close time with time zone, p_duration smallint)
 RETURNS TABLE(start_time time with time zone, end_time time with time zone)
 LANGUAGE plpgsql
AS $function$BEGIN
  IF p_duration >= 24 THEN
      
    -- Coworking: both start and end must be NULL
    IF p_start IS NOT NULL OR p_end IS NOT NULL THEN
      RAISE EXCEPTION 'Coworking voucher: leave start/end time empty.';
    END IF;
    RETURN QUERY SELECT p_open, p_close;
  ELSE

    -- Meeting room: both must be provided
    IF p_start IS NULL OR p_end IS NULL THEN
      RAISE EXCEPTION 'Provide both start and end time.';
    END IF;
    RETURN QUERY SELECT p_start, p_end;
  END IF;
END;$function$
;


