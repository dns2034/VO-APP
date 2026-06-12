alter table "public"."space_availability" enable row level security;

create policy "Clients can view availability only for spaces in their org"
on "public"."space_availability"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = space_availability.space_id) AND (user_organizations.user_id = auth.uid())))));



