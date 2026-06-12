set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_manager(p_user uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  select exists (
    select 1
    from user_roles
    where user_id = p_user
      and role = 'manager'::roles
  );
$function$
;


  create policy "Managers can view user_roles in their org"
  on "public"."user_roles"
  as permissive
  for select
  to authenticated
using ((is_manager(auth.uid()) AND (EXISTS ( SELECT 1
   FROM (user_organizations muo
     JOIN user_organizations cuo ON ((muo.organization_id = cuo.organization_id)))
  WHERE ((muo.user_id = auth.uid()) AND (cuo.user_id = user_roles.user_id))))));



