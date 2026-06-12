CREATE OR REPLACE FUNCTION public.get_total_active_credits(
  p_user_id UUID
)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Count all active, non-expired credits for the user
  SELECT COUNT(*) INTO v_count
  FROM public.credits
  WHERE user_id = p_user_id
    AND status = 'active'
    AND expires_at > NOW();

  RETURN v_count;
END;
$$ LANGUAGE plpgsql;
