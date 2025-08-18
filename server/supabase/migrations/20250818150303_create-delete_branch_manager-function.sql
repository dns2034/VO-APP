set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_branch_manager(p_user_id uuid, p_branch_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  if not public.is_manager(p_user_id) then
    raise exception 'Access denied: only managers can delete branches';
  end if;

  delete from public.branches where id = p_branch_id;
end;
$function$
;


