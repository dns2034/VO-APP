CREATE OR REPLACE FUNCTION public.validate_time_within_bounds(
  p_start TIME WITH TIME ZONE,
  p_end TIME WITH TIME ZONE,
  p_open TIME WITH TIME ZONE,
  p_close TIME WITH TIME ZONE
)
RETURNS VOID AS $$
BEGIN
  -- Ensure the booking start time is not earlier than the space opening time
  IF p_start < p_open THEN
    RAISE EXCEPTION 'Opening time is at %.', p_open;
  END IF;

  -- Ensure the booking end time is not later than the space closing time
  IF p_end > p_close THEN
    RAISE EXCEPTION 'Closing time is at %.', p_close;
  END IF;
END;
$$ LANGUAGE plpgsql;
