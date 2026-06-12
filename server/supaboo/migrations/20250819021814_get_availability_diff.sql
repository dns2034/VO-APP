set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_availability_diff(p_space_id uuid, p_start_date date, p_end_date date)
 RETURNS TABLE(availability_name text, total_slots integer, available_slots integer, remark text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_days_in_range integer;
  v_availability_exists boolean;
  v_space_name text;
BEGIN
  -- Calculate days in range
  v_days_in_range := p_end_date - p_start_date + 1;
  
  -- Get space name
  SELECT name INTO v_space_name
  FROM public.spaces
  WHERE id = p_space_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Space not found with ID: %', p_space_id;
  END IF;
  
  -- Check if availability exists for this range
  SELECT EXISTS (
    SELECT 1 
    FROM public.space_availability 
    WHERE space_id = p_space_id
      AND date BETWEEN p_start_date AND p_end_date
  ) INTO v_availability_exists;
  
  -- Calculate available slots (days without bookings)
  RETURN QUERY
  WITH date_range AS (
    SELECT generate_series(
      p_start_date, 
      p_end_date, 
      '1 day'::interval
    )::date AS day
  ),
  booked_days AS (
    SELECT DISTINCT b.date
    FROM public.bookings b
    JOIN public.space_units su ON b.space_unit_id = su.id
    WHERE su.space_id = p_space_id
      AND b.date BETWEEN p_start_date AND p_end_date
      AND b.status NOT IN ('cancelled', 'completed')
  )
  SELECT 
    v_space_name || ' ' || 
    to_char(p_start_date, 'Mon DD') || ' - ' || 
    to_char(p_end_date, 'Mon DD, YYYY') AS availability_name,
    v_days_in_range AS total_slots,
    v_days_in_range - COUNT(b.day) AS available_slots,
    CASE 
      WHEN NOT v_availability_exists THEN 'New availability range'
      WHEN COUNT(b.day) = 0 THEN 'All days available'
      ELSE 'Some days already booked'
    END AS remark
  FROM date_range d
  LEFT JOIN booked_days b ON d.day = b.date;
END;
$function$
;


