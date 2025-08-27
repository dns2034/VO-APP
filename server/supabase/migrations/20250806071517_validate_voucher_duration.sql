CREATE OR REPLACE FUNCTION public.validate_voucher_duration(
  p_start TIME WITH TIME ZONE,
  p_end TIME WITH TIME ZONE,
  p_duration SMALLINT
)
RETURNS VOID AS $$
DECLARE
  v_actual_duration INTERVAL;
BEGIN
  -- Only check duration for vouchers that are time-based (less than 24 hours)
  IF p_duration < 24 THEN
    v_actual_duration := p_end::time - p_start::time;

    IF EXTRACT(EPOCH FROM v_actual_duration) > (p_duration * 3600) THEN
      RAISE EXCEPTION 'Booking exceeds allowed voucher duration of % hour(s).', p_duration;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;
