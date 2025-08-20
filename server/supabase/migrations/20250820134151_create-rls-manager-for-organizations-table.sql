alter table "public"."organizations" enable row level security;

create policy "Managers can view their organization"
on "public"."organizations"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = organizations.id)))));



