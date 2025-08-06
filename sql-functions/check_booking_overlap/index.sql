CREATE OR REPLACE FUNCTION check_booking_overlap(
  p_space_unit_id UUID,
  p_date DATE,
  p_start TIME,
  p_end TIME
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  overlapping_count INT;
BEGIN
  SELECT COUNT(*) INTO overlapping_count
  FROM bookings
  WHERE space_unit_id = p_space_unit_id
    AND date = p_date
    AND (p_start, p_end) OVERLAPS (start_time, end_time);

  IF overlapping_count > 0 THEN
    RAISE EXCEPTION 'Booking overlaps with an existing one.';
  END IF;
END;
$$;
