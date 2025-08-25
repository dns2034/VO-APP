CREATE OR REPLACE FUNCTION get_user_subscription_type(p_user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_subscription_type TEXT;
BEGIN
  SELECT s.subscriptions_type
  INTO v_subscription_type
  FROM public.user_subscriptions us
  JOIN public.subscriptions s ON us.subscription_id = s.id
  WHERE us.id = p_user_id
    AND (us.expires_at IS NULL OR us.expires_at > NOW())
  ORDER BY us.started_at DESC
  LIMIT 1;

  RETURN v_subscription_type;
END;
$$;
