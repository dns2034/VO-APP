drop policy "Manager can manage credits in their org" on "public"."credits";

drop policy "Manager can manage points in their orgs" on "public"."points";

create policy "Manager can manage user landing pages within their org"
on "public"."user_landing_pages"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = user_landing_pages.user_id)))))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = user_landing_pages.user_id)))))));


create policy "Manager can manage credits in their org"
on "public"."credits"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = credits.user_id)))))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = credits.user_id)))))));


create policy "Manager can manage points in their orgs"
on "public"."points"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = points.user_id)))))));



