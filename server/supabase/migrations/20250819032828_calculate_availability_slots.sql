set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.calculate_availability_slots(space_id uuid, start_date date, end_date date)
 RETURNS TABLE(availability_name text, total_slots integer, available_slots integer, remark text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  days_in_range integer;
  availability_exists boolean;
  space_name text;
BEGIN
  -- Calculate days in range
  days_in_range := end_date - start_date + 1;
  
  -- Get space name
  SELECT name INTO space_name
  FROM public.spaces
  WHERE id = space_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Space not found with ID: %', space_id;
  END IF;
  
  -- Check if availability exists for this range
  SELECT EXISTS (
    SELECT 1 
    FROM public.space_availability 
    WHERE space_availability.space_id = calculate_availability_slots.space_id
      AND space_availability.date BETWEEN calculate_availability_slots.start_date AND calculate_availability_slots.end_date
  ) INTO availability_exists;
  
  -- Calculate available slots (days without bookings)
  RETURN QUERY
  WITH date_series AS (
    SELECT generate_series(
      calculate_availability_slots.start_date, 
      calculate_availability_slots.end_date, 
      '1 day'::interval
    )::date AS series_date
  ),
  booked_dates AS (
    SELECT DISTINCT bookings.date
    FROM public.bookings
    JOIN public.space_units ON bookings.space_unit_id = space_units.id
    WHERE space_units.space_id = calculate_availability_slots.space_id
      AND bookings.date BETWEEN calculate_availability_slots.start_date AND calculate_availability_slots.end_date
      AND bookings.status NOT IN ('cancelled', 'completed')
  )
  SELECT 
    space_name || ' ' || 
    to_char(start_date, 'Mon DD') || ' - ' || 
    to_char(end_date, 'Mon DD, YYYY'),
    days_in_range::integer,
    (days_in_range - COUNT(booked_dates.date))::integer,  -- Explicit cast to integer
    CASE 
      WHEN NOT availability_exists THEN 'New availability range'
      WHEN COUNT(booked_dates.date) = 0 THEN 'All days available'
      ELSE 'Some days already booked'
    END
  FROM date_series
  LEFT JOIN booked_dates ON date_series.series_date = booked_dates.date
  GROUP BY space_name, days_in_range, availability_exists;
END;
$function$
;


