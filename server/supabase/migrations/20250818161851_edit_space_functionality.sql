set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_space_manager(p_space_id uuid, p_name text DEFAULT NULL::text, p_description text DEFAULT NULL::text, p_capacity integer DEFAULT NULL::integer, p_is_available boolean DEFAULT NULL::boolean)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  -- Check manager role
  if not public.is_manager(auth.uid()) then
    raise exception 'Access denied: only managers can update spaces';
  end if;

  -- Ensure space exists and belongs to same org as manager
  if not exists (
    select 1
    from public.spaces s
    join public.branches b on s.branch_id = b.id
    join public.user_organizations uo on b.organization_id = uo.organization_id
    where s.id = p_space_id
      and uo.user_id = auth.uid()
  ) then
    raise exception 'Access denied: manager does not belong to this organization or space does not exist';
  end if;

  -- Perform update (only update provided fields)
  update public.spaces
  set
    name = coalesce(p_name, name),
    descriptions = coalesce(p_description, descriptions),
    capacity = coalesce(p_capacity, capacity),
    is_available = coalesce(p_is_available, is_available)
  where id = p_space_id;

end;
$function$
;


