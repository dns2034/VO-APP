create policy "Manager can manage points in their orgs"
on "public"."points"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (((user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
     JOIN profiles ON ((profiles.id = points.user_id)))
     JOIN user_organizations uo_client ON ((uo_client.user_id = profiles.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = uo_client.organization_id)))));



