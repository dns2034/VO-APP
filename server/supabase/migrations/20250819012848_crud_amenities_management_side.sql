set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_amenity_manager(p_branch_id uuid, p_name text, p_amenity_url text DEFAULT NULL::text, p_is_available boolean DEFAULT true)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_amenity_id bigint;
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can add amenities';
    END IF;

    -- Ensure branch belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.branches b
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE b.id = p_branch_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or branch does not exist';
    END IF;

    INSERT INTO public.amenities (branch_id, name, amenity_url, is_available)
    VALUES (p_branch_id, p_name, p_amenity_url, p_is_available)
    RETURNING id INTO v_amenity_id;

    RETURN v_amenity_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_amenity_manager(p_amenity_id bigint)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can delete amenities';
    END IF;

    -- Ensure amenity belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.amenities a
        JOIN public.branches b ON a.branch_id = b.id
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE a.id = p_amenity_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or amenity does not exist';
    END IF;

    DELETE FROM public.amenities
    WHERE id = p_amenity_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_amenity_availability(p_amenity_id bigint, p_is_available boolean)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can change amenity availability';
    END IF;

    -- Ensure amenity belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.amenities a
        JOIN public.branches b ON a.branch_id = b.id
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE a.id = p_amenity_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or amenity does not exist';
    END IF;

    UPDATE public.amenities
    SET is_available = p_is_available
    WHERE id = p_amenity_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_amenity_manager(p_amenity_id bigint, p_name text DEFAULT NULL::text, p_amenity_url text DEFAULT NULL::text, p_is_available boolean DEFAULT NULL::boolean)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can update amenities';
    END IF;

    -- Ensure amenity belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.amenities a
        JOIN public.branches b ON a.branch_id = b.id
        JOIN public.user_organizations uo ON b.organization_id = uo.organization_id
        WHERE a.id = p_amenity_id
          AND uo.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: manager does not belong to this organization or amenity does not exist';
    END IF;

    UPDATE public.amenities
    SET name = COALESCE(p_name, name),
        amenity_url = COALESCE(p_amenity_url, amenity_url),
        is_available = COALESCE(p_is_available, is_available)
    WHERE id = p_amenity_id;
END;
$function$
;


