set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.remove_availability(p_availability_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_is_manager boolean;
  v_has_bookings boolean;
  v_space_id uuid;
  v_date date;
BEGIN
  -- First verify user is a manager
  SELECT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'manager'
  ) INTO v_is_manager;
  
  IF NOT v_is_manager THEN
    RAISE EXCEPTION 'Only managers can remove availability';
  END IF;

  -- Get the space_id and date for validation
  SELECT space_id, date INTO v_space_id, v_date
  FROM space_availability
  WHERE id = p_availability_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Availability record not found';
  END IF;

  -- Verify manager belongs to the space's organization
  PERFORM 1
  FROM spaces
  JOIN branches ON spaces.branch_id = branches.id
  JOIN user_organizations ON branches.organization_id = user_organizations.organization_id
  WHERE spaces.id = v_space_id
    AND user_organizations.user_id = auth.uid();
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Not authorized to manage this space';
  END IF;

  -- Check for existing bookings
  SELECT EXISTS (
    SELECT 1
    FROM bookings
    JOIN space_units ON bookings.space_unit_id = space_units.id
    WHERE space_units.space_id = v_space_id
      AND bookings.date = v_date
      AND bookings.status NOT IN ('cancelled', 'completed')
  ) INTO v_has_bookings;
  
  IF v_has_bookings THEN
    RAISE EXCEPTION 'Cannot remove availability - existing bookings exist for this date';
  END IF;

  -- Delete the availability record
  DELETE FROM space_availability
  WHERE id = p_availability_id;
END;
$function$
;


