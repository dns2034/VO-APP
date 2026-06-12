
  create policy "Managers can manage reward vouchers in their org"
  on "public"."reward_vouchers"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((rewards r
     JOIN user_organizations uo ON ((uo.organization_id = r.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((r.id = reward_vouchers.reward_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))))
with check ((EXISTS ( SELECT 1
   FROM ((rewards r
     JOIN user_organizations uo ON ((uo.organization_id = r.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((r.id = reward_vouchers.reward_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



