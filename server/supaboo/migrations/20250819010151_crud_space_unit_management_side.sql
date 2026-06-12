alter table "public"."space_units" add column "remark" text;

alter table "public"."space_units" add column "status" space_units_status not null default 'active'::space_units_status;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_space_unit_manager(p_space_id uuid, p_name text, p_status space_units_status DEFAULT 'active'::space_units_status, p_remark text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_space_unit_id uuid;
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can add space units';
    END IF;

    -- Ensure space belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.spaces s
        JOIN public.branches b ON s.branch_id = b.id
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE s.id = p_space_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or space does not exist';
    END IF;

    INSERT INTO public.space_units (space_id, name, status, remark)
    VALUES (p_space_id, p_name, p_status, p_remark)
    RETURNING id INTO v_space_unit_id;

    RETURN v_space_unit_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_space_unit_manager(p_space_unit_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_booking_count int;
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can delete space units';
    END IF;

    -- Ensure unit exists and belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.space_units su
        JOIN public.spaces s ON su.space_id = s.id
        JOIN public.branches b ON s.branch_id = b.id
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE su.id = p_space_unit_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or space unit does not exist';
    END IF;

    -- Check for existing bookings
    SELECT COUNT(*) INTO v_booking_count
    FROM public.bookings
    WHERE space_unit_id = p_space_unit_id;

    IF v_booking_count > 0 THEN
        RAISE EXCEPTION 'Cannot delete space unit %, it has % associated booking(s)', p_space_unit_id, v_booking_count;
    END IF;

    -- Safe to delete
    DELETE FROM public.space_units
    WHERE id = p_space_unit_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_space_unit_status(p_space_unit_id uuid, p_status space_units_status)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can change space unit status';
    END IF;

    -- Ensure unit exists and belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.space_units su
        JOIN public.spaces s ON su.space_id = s.id
        JOIN public.branches b ON s.branch_id = b.id
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE su.id = p_space_unit_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or space unit does not exist';
    END IF;

    -- Update status explicitly
    UPDATE public.space_units
    SET status = p_status
    WHERE id = p_space_unit_id;

    RAISE NOTICE 'Space unit % status set to %', p_space_unit_id, p_status;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_space_unit_manager(p_space_unit_id uuid, p_name text DEFAULT NULL::text, p_status space_units_status DEFAULT NULL::space_units_status, p_remark text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can update space units';
    END IF;

    -- Ensure unit exists and belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.space_units su
        JOIN public.spaces s ON su.space_id = s.id
        JOIN public.branches b ON s.branch_id = b.id
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE su.id = p_space_unit_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or space unit does not exist';
    END IF;

    UPDATE public.space_units
    SET name   = COALESCE(p_name, name),
        status = COALESCE(p_status, status),
        remark = COALESCE(p_remark, remark)
    WHERE id = p_space_unit_id;
END;
$function$
;


