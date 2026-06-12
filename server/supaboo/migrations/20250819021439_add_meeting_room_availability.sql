set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_meeting_room_availability(p_space_id uuid, p_start_date date, p_end_date date, p_opening_time time with time zone, p_closing_time time with time zone, p_remarks text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_current_date date;
  v_overlap_exists boolean;
  v_diff_record record;
BEGIN
  -- Validate date range
  IF p_start_date > p_end_date THEN
    RAISE EXCEPTION 'Start date must be before end date';
  END IF;
  
  -- Check for existing overlapping availability
  SELECT EXISTS (
    SELECT 1
    FROM public.space_availability
    WHERE space_id = p_space_id
      AND date BETWEEN p_start_date AND p_end_date
  ) INTO v_overlap_exists;
  
  IF v_overlap_exists THEN
    RAISE EXCEPTION 'Availability already exists for some dates in this range';
  END IF;
  
  -- Get availability diff info
  SELECT * INTO v_diff_record
  FROM get_availability_diff(p_space_id, p_start_date, p_end_date);
  
  -- Check if any days are already booked
  IF v_diff_record.available_slots < v_diff_record.total_slots THEN
    RAISE EXCEPTION 'Cannot add availability - some days already have bookings';
  END IF;
  
  -- Insert availability for each day in range
  v_current_date := p_start_date;
  WHILE v_current_date <= p_end_date LOOP
    INSERT INTO public.space_availability (
      space_id,
      date,
      opening_time,
      closing_time,
      remarks
    ) VALUES (
      p_space_id,
      v_current_date,
      p_opening_time,
      p_closing_time,
      COALESCE(p_remarks, v_diff_record.remark)
    );
    
    v_current_date := v_current_date + 1;
  END LOOP;
END;
$function$
;


