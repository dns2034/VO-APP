set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_branch_manager(p_user_id uuid, p_name text, p_organization_id uuid, p_image_path text DEFAULT NULL::text, p_location text DEFAULT NULL::text, p_pin_location jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
  v_branch_id uuid;
begin
  if not public.is_manager(p_user_id) then
    raise exception 'Access denied: only managers can create branches';
  end if;

  insert into public.branches (
    name, organization_id, image_path, location, pin_location
  ) values (
    p_name, p_organization_id, p_image_path, p_location, p_pin_location
  )
  returning id into v_branch_id;

  return v_branch_id;
end;
$function$
;


