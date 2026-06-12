set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_space_availability(availability_id uuid, new_date date DEFAULT NULL::date, new_opening_time time with time zone DEFAULT NULL::time with time zone, new_closing_time time with time zone DEFAULT NULL::time with time zone, new_remarks text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  current_record record;
  has_bookings boolean;
  space_id_val uuid;
  is_manager boolean;
  overlap_exists boolean;
BEGIN
  -- First verify user is a manager
  SELECT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'manager'
  ) INTO is_manager;
  
  IF NOT is_manager THEN
    RAISE EXCEPTION 'Only managers can update availability';
  END IF;

  -- Get current record with organization check
  SELECT 
    sa.space_id,
    sa.date,
    sa.opening_time,
    sa.closing_time
  INTO current_record
  FROM space_availability sa
  JOIN spaces s ON sa.space_id = s.id
  JOIN branches b ON s.branch_id = b.id
  JOIN user_organizations uo ON b.organization_id = uo.organization_id
  WHERE sa.id = availability_id
    AND uo.user_id = auth.uid();
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Availability record not found or not authorized';
  END IF;

  space_id_val := current_record.space_id;

  -- Check if date is being changed
  IF new_date IS NOT NULL AND new_date <> current_record.date THEN
    -- Check for bookings on original date
    SELECT EXISTS (
      SELECT 1 FROM bookings b
      JOIN space_units su ON b.space_unit_id = su.id
      WHERE su.space_id = space_id_val
        AND b.date = current_record.date
        AND b.status NOT IN ('cancelled', 'completed')
    ) INTO has_bookings;
    
    IF has_bookings THEN
      RAISE EXCEPTION 'Cannot change date - existing bookings';
    END IF;
  END IF;

  -- Check for overlapping availability (whether date changed or not)
  -- Only if time slots are being modified
  IF (new_opening_time IS NOT NULL OR new_closing_time IS NOT NULL) THEN
    SELECT EXISTS (
      SELECT 1 
      FROM space_availability
      WHERE space_id = space_id_val
        AND date = COALESCE(new_date, current_record.date)
        AND id <> availability_id  -- Exclude current record
        AND (
          COALESCE(new_opening_time, current_record.opening_time),
          COALESCE(new_closing_time, current_record.closing_time)
        ) OVERLAPS (opening_time, closing_time)
    ) INTO overlap_exists;
    
    IF overlap_exists THEN
      RAISE EXCEPTION 'The requested time slot overlaps with existing availability';
    END IF;

    -- Check for overlapping bookings
    SELECT EXISTS (
      SELECT 1
      FROM bookings b
      JOIN space_units su ON b.space_unit_id = su.id
      WHERE su.space_id = space_id_val
        AND b.date = COALESCE(new_date, current_record.date)
        AND b.status NOT IN ('cancelled', 'completed')
        AND (
          COALESCE(new_opening_time, current_record.opening_time),
          COALESCE(new_closing_time, current_record.closing_time)
        ) OVERLAPS (b.start_time, b.end_time)
    ) INTO overlap_exists;
    
    IF overlap_exists THEN
      RAISE EXCEPTION 'The requested time slot conflicts with an existing booking';
    END IF;
  END IF;

  -- Perform the update
  UPDATE space_availability
  SET 
    date = COALESCE(new_date, date),
    opening_time = COALESCE(new_opening_time, opening_time),
    closing_time = COALESCE(new_closing_time, closing_time),
    remarks = COALESCE(new_remarks, remarks)
  WHERE id = availability_id;
END;
$function$
;


