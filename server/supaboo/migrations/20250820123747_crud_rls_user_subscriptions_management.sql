
  create policy "Managers can manage user subscriptions in their org"
  on "public"."user_subscriptions"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = user_subscriptions.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = user_subscriptions.organization_id)))));



