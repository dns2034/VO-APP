drop policy "All users can view subscription plans" on "public"."subscriptions";

create policy "All users can view subscription plans"
on "public"."subscriptions"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations
  WHERE ((user_organizations.organization_id = subscriptions.organization_id) AND (user_organizations.user_id = auth.uid())))));



