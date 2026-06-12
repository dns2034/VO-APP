drop function if exists "public"."add_space_manager"(p_user_id uuid, p_branch_id uuid, p_name text, p_descriptions text, p_capacity smallint, p_is_available boolean);

drop function if exists "public"."create_branch_manager"(p_user_id uuid, p_name text, p_organization_id uuid, p_image_path text, p_location text, p_pin_location jsonb);

drop function if exists "public"."delete_branch_manager"(p_user_id uuid, p_branch_id uuid);

drop function if exists "public"."delete_space_manager"(p_user_id uuid, p_space_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_space_manager(p_branch_id uuid, p_name text, p_descriptions text DEFAULT ''::text, p_capacity smallint DEFAULT 1, p_is_available boolean DEFAULT true)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$DECLARE
    v_space_id uuid;
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can add spaces';
    END IF;

    INSERT INTO public.spaces (branch_id, name, descriptions, capacity, is_available)
    VALUES (p_branch_id, p_name, p_descriptions, p_capacity, p_is_available)
    RETURNING id INTO v_space_id;

    RETURN v_space_id;
END;$function$
;

CREATE OR REPLACE FUNCTION public.create_branch_manager(p_name text, p_organization_id uuid, p_image_path text DEFAULT NULL::text, p_location text DEFAULT NULL::text, p_pin_location jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_branch_id uuid;
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can create branches';
    END IF;

    INSERT INTO public.branches (name, organization_id, image_path, location, pin_location)
    VALUES (p_name, p_organization_id, p_image_path, p_location, p_pin_location)
    RETURNING id INTO v_branch_id;

    RETURN v_branch_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_branch_manager(p_branch_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can delete branches';
    END IF;

    -- Ensure branch exists and belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.branches
        JOIN public.user_organizations
          ON branches.organization_id = user_organizations.organization_id
        WHERE branches.id = p_branch_id
          AND user_organizations.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: branch not found or manager does not belong to this organization';
    END IF;

    -- Prevent delete if branch has any bookings through spaces/units
    IF EXISTS (
        SELECT 1
        FROM public.bookings
        JOIN public.space_units ON bookings.space_unit_id = space_units.id
        JOIN public.spaces ON space_units.space_id = spaces.id
        WHERE spaces.branch_id = p_branch_id
    ) THEN
        RAISE EXCEPTION 'Cannot delete branch: there are existing bookings linked to its spaces';
    END IF;

    -- Delete it
    DELETE FROM public.branches
    WHERE id = p_branch_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_space_manager(p_space_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check manager role
    IF NOT public.is_manager(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: only managers can delete spaces';
    END IF;

    -- Ensure space exists and belongs to same org as manager
    IF NOT EXISTS (
        SELECT 1
        FROM public.spaces
        JOIN public.branches ON spaces.branch_id = branches.id
        JOIN public.user_organizations ON branches.organization_id = user_organizations.organization_id
        WHERE spaces.id = p_space_id
          AND user_organizations.user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied: space not found or manager does not belong to this organization';
    END IF;

    -- Prevent delete if space has any bookings through its space_units
    IF EXISTS (
        SELECT 1
        FROM public.bookings
        JOIN public.space_units ON bookings.space_unit_id = space_units.id
        WHERE space_units.space_id = p_space_id
    ) THEN
        RAISE EXCEPTION 'Cannot delete space: there are existing bookings linked to its units';
    END IF;

    -- Delete it
    DELETE FROM public.spaces
    WHERE id = p_space_id;
END;
$function$
;


