set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_manager(p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
AS $function$
  select exists (
    select 1
    from public.user_roles
    where user_roles.user_id = p_user_id
      and user_roles.role = 'manager'
  );
$function$
;


