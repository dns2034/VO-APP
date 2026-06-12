
  create policy "client_select_own_referrals"
  on "public"."partner_referrals"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM partners p
  WHERE (p.id = partner_referrals.partner_id))));



  create policy "manager_manage_referrals"
  on "public"."partner_referrals"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



