drop function if exists "public"."get_space_availability"(p_space_unit_id uuid, p_date date);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_space_availability(p_space_unit_id uuid, p_date date)
 RETURNS TABLE(opening_time time with time zone, closing_time time with time zone)
 LANGUAGE plpgsql
AS $function$--- Fetches the space's available opening_time and closing_time for the date.
BEGIN

  -- Debug: show input values
  RAISE NOTICE 'Input values → space_unit_id: %, date: %', p_space_unit_id, p_date;
  
  RETURN QUERY
  SELECT sa.opening_time, sa.closing_time
  FROM public.space_units su
  JOIN public.spaces s ON su.space_id = s.id
  JOIN public.space_availability sa ON sa.space_id = s.id
  WHERE su.id = p_space_unit_id
    AND sa.date = p_date
  LIMIT 1;

  -- If no availability is found for that day, raise an error
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No availability found for the selected date.';
  END IF;
END;$function$
;


