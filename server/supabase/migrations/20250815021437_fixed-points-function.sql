set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_total_active_points(p_user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$DECLARE
  v_count INTEGER;
BEGIN
  -- Count all active, non-expired points for the user
  SELECT COUNT(*) INTO v_count
  FROM public.points
  WHERE user_id = p_user_id
    AND status = 'active'
    AND expires_at > NOW();

  RETURN v_count;
END;$function$
;


