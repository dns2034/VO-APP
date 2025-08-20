create policy "Clients can insert businesses"
on "public"."businesses"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));


create policy "Manager can manage businesses in their org"
on "public"."businesses"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
     JOIN user_organizations owner_org ON ((owner_org.organization_id = user_organizations.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (owner_org.user_id = businesses.user_id)))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
     JOIN user_organizations owner_org ON ((owner_org.organization_id = user_organizations.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (owner_org.user_id = businesses.user_id)))));



