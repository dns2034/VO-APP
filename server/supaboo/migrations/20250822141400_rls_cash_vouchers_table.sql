alter table "public"."cash_vouchers" enable row level security;


  create policy "client_select_own_cash_vouchers"
  on "public"."cash_vouchers"
  as permissive
  for select
  to authenticated
using ((partner_id = ( SELECT p.id
   FROM partners p
  WHERE (p.id = cash_vouchers.partner_id))));



  create policy "manager_manage_cash_vouchers"
  on "public"."cash_vouchers"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



