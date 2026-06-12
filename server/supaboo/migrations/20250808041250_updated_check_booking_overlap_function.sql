drop function if exists "public"."check_booking_overlap"(p_space_unit_id uuid, p_date date, p_start time without time zone, p_end time without time zone);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_booking_overlap(p_space_unit_id uuid, p_date date, p_start time with time zone, p_end time with time zone)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  overlapping_count INT;
BEGIN
  -- Only check for overlaps if the booking is time-based (e.g., Meeting Rooms)
  IF p_start IS NOT NULL AND p_end IS NOT NULL THEN
    SELECT COUNT(*) INTO overlapping_count
    FROM public.bookings
    WHERE space_unit_id = p_space_unit_id
      AND date = p_date
      AND status != 'cancelled'  -- Ignore cancelled bookings
      AND start_time IS NOT NULL
      AND end_time IS NOT NULL
      AND (p_start, p_end) OVERLAPS (start_time, end_time);

    IF overlapping_count > 0 THEN
      RAISE EXCEPTION 'Booking overlaps with an existing one.';
    END IF;
  END IF;

  -- No overlap check for full-day (coworking/VO) bookings
END;$function$
;


