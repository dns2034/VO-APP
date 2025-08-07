drop policy "Authenticated user can view products" on "public"."products";

create policy "Authenticated user can view products"
on "public"."products"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = products.space_id) AND (user_organizations.user_id = auth.uid())))));



