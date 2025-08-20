create policy "Manager can manage credits in their org"
on "public"."credits"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id IN ( SELECT user_organizations_1.organization_id
           FROM user_organizations user_organizations_1
          WHERE (user_organizations_1.user_id = credits.user_id)))))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id IN ( SELECT user_organizations_1.organization_id
           FROM user_organizations user_organizations_1
          WHERE (user_organizations_1.user_id = credits.user_id)))))));



