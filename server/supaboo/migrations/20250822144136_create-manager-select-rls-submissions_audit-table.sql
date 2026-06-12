create policy "Managers can view submissions audit"
on "public"."submissions_audit"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



