set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_space_manager(p_user_id uuid, p_branch_id uuid, p_name text, p_descriptions text DEFAULT ''::text, p_capacity smallint DEFAULT 1, p_is_available boolean DEFAULT true)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
    v_space_id uuid;
begin
    -- check if user is a manager
    if not public.is_manager(p_user_id) then
        raise exception 'Access denied: only managers can add spaces';
    end if;

    -- insert the new space
    insert into public.spaces (branch_id, name, descriptions, capacity, is_available)
    values (p_branch_id, p_name, p_descriptions, p_capacity, p_is_available)
    returning id into v_space_id;

    return v_space_id;
end;
$function$
;


