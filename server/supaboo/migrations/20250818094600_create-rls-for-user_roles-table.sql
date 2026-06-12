drop policy "Clients can view amenities in their organization" on "public"."amenities";

create policy "Users can view their own role"
on "public"."user_roles"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Clients can view amenities in their organization"
on "public"."amenities"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (branches
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((branches.id = amenities.branch_id) AND (user_organizations.user_id = auth.uid())))));



