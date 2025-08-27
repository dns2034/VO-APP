CREATE OR REPLACE FUNCTION get_space_availability(
  p_space_unit_id UUID,
  p_date DATE
)
RETURNS TABLE(opening_time TIME, closing_time TIME)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT sa.opening_time, sa.closing_time
  FROM public.space_units su
  JOIN public.spaces s ON su.space_id = s.id
  JOIN public.space_availability sa ON sa.space_id = s.id
  WHERE su.id = p_space_unit_id
    AND sa.date = p_date
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No availability found for the selected date.';
  END IF;
END;
$$;