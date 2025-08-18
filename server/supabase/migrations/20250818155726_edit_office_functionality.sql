set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_branch_manager(p_branch_id uuid, p_name text DEFAULT NULL::text, p_image_path text DEFAULT NULL::text, p_location text DEFAULT NULL::text, p_pin_location jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  -- Check manager role
  if not public.is_manager(auth.uid()) then
    raise exception 'Access denied: only managers can update branches';
  end if;

  -- Ensure branch exists and belongs to the same org as manager
  if not exists (
    select 1
    from public.branches b
    join public.user_organizations uo on b.organization_id = uo.organization_id
    where b.id = p_branch_id
      and uo.user_id = auth.uid()
  ) then
    raise exception 'Access denied: manager does not belong to this organization or branch does not exist';
  end if;

  -- Perform update (only update fields that are passed)
  update public.branches
  set
    name = coalesce(p_name, name),
    image_path = coalesce(p_image_path, image_path),
    location = coalesce(p_location, location),
    pin_location = coalesce(p_pin_location, pin_location)
  where id = p_branch_id;

end;
$function$
;


