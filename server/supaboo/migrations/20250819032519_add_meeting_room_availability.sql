drop function if exists "public"."add_meeting_room_availability"(p_space_id uuid, p_start_date date, p_end_date date, p_opening_time time with time zone, p_closing_time time with time zone, p_remarks text);

drop function if exists "public"."get_availability_diff"(p_space_id uuid, p_start_date date, p_end_date date);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_meeting_room_availability(space_id uuid, start_date date, end_date date, opening_time time with time zone, closing_time time with time zone, remarks text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  current_date_var date;
  overlap_exists boolean;
  slots_info record;
  is_manager boolean;
  space_organization_id uuid;  -- Renamed from organization_id to avoid ambiguity
BEGIN
  -- First check if user is a manager
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'manager'::roles
  ) INTO is_manager;
  
  IF NOT is_manager THEN
    RAISE EXCEPTION 'Only managers can add meeting room availability';
  END IF;

  -- Get organization_id for this space
  SELECT branches.organization_id INTO space_organization_id  -- Changed variable name
  FROM public.spaces
  JOIN public.branches ON spaces.branch_id = branches.id
  WHERE spaces.id = space_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Space not found';
  END IF;
  
  -- Verify manager belongs to the same organization
  PERFORM 1
  FROM public.user_organizations
  WHERE user_organizations.user_id = auth.uid()
    AND user_organizations.organization_id = space_organization_id;  -- Use renamed variable
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Manager does not have permission for this organization';
  END IF;

  -- Validate date range
  IF start_date > end_date THEN
    RAISE EXCEPTION 'Start date must be before end date';
  END IF;
  
  -- Check for existing overlapping availability
  SELECT EXISTS (
    SELECT 1
    FROM public.space_availability
    WHERE space_availability.space_id = add_meeting_room_availability.space_id
      AND space_availability.date BETWEEN add_meeting_room_availability.start_date AND add_meeting_room_availability.end_date
  ) INTO overlap_exists;
  
  IF overlap_exists THEN
    RAISE EXCEPTION 'Availability already exists for some dates in this range';
  END IF;
  
  -- Get availability info
  SELECT * INTO slots_info
  FROM calculate_availability_slots(space_id, start_date, end_date);
  
  -- Check if any days are already booked
  IF slots_info.available_slots < slots_info.total_slots THEN
    RAISE EXCEPTION 'Cannot add availability - some days already have bookings';
  END IF;
  
  -- Insert availability for each day in range
  current_date_var := start_date;
  WHILE current_date_var <= end_date LOOP
    INSERT INTO public.space_availability (
      space_id,
      date,
      opening_time,
      closing_time,
      remarks
    ) VALUES (
      space_id,
      current_date_var,
      opening_time,
      closing_time,
      COALESCE(remarks, slots_info.remark)
    );
    
    current_date_var := current_date_var + 1;
  END LOOP;
END;
$function$
;


