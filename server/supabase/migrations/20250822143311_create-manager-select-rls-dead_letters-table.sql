alter table "public"."dead_letters" enable row level security;

create policy "Managers can view dead letters"
on "public"."dead_letters"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



