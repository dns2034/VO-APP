drop policy "Clients can view businesses inside their organization" on "public"."businesses";

drop policy "Enable select" on "public"."user_organizations";


  create policy "Clients can view businesses inside their organization"
  on "public"."businesses"
  as permissive
  for select
  to authenticated
using (((user_id = auth.uid()) OR (EXISTS ( SELECT current_org.id,
    current_org.created_at,
    current_org.user_id,
    current_org.organization_id,
    owner_org.id,
    owner_org.created_at,
    owner_org.user_id,
    owner_org.organization_id
   FROM (user_organizations current_org
     JOIN user_organizations owner_org ON ((current_org.organization_id = owner_org.organization_id)))
  WHERE ((current_org.user_id = auth.uid()) AND (owner_org.user_id = businesses.user_id))))));



  create policy "Enable select"
  on "public"."user_organizations"
  as permissive
  for select
  to authenticated
using (true);



