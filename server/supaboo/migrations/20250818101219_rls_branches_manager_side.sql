
  create policy "Managers can create branches"
  on "public"."branches"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));



  create policy "Managers can delete branches"
  on "public"."branches"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));



  create policy "Managers can update branches"
  on "public"."branches"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));



  create policy "Managers can view branches"
  on "public"."branches"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));



