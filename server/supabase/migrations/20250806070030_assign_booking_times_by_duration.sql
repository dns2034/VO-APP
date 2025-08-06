CREATE OR REPLACE FUNCTION assign_booking_times_by_duration(
  p_duration INTEGER,
  p_start TIME,
  p_end TIME,
  p_open TIME,
  p_close TIME
)
RETURNS TABLE(start_time TIME, end_time TIME)
LANGUAGE plpgsql
AS $$
BEGIN
  IF p_duration >= 24 THEN
    -- Coworking: both start and end must be NULL
    IF p_start IS NOT NULL OR p_end IS NOT NULL THEN
      RAISE EXCEPTION 'Do not provide custom time for coworking voucher. Leave start and end time empty.';
    END IF;
    RETURN QUERY SELECT p_open, p_close;

  ELSE
    -- Meeting room: both must be provided
    IF p_start IS NULL OR p_end IS NULL THEN
      RAISE EXCEPTION 'Start and end time must both be provided for meeting room voucher.';
    END IF;
    RETURN QUERY SELECT p_start, p_end;
  END IF;
END;
$$;
