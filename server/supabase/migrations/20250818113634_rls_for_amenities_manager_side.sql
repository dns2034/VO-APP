
  create policy "Managers can manage amenities"
  on "public"."amenities"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((amenities.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((amenities.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));



