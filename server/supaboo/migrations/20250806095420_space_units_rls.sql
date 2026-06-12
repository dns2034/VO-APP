alter table "public"."space_units" enable row level security;

create policy "Clients can view units of spaces they belong to"
on "public"."space_units"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = space_units.space_id) AND (user_organizations.user_id = auth.uid())))));



