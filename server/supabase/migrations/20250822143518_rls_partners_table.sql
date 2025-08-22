drop policy "client_select_own_cash_vouchers" on "public"."cash_vouchers";

drop policy "manager_manage_cash_vouchers" on "public"."cash_vouchers";

alter table "public"."partners" enable row level security;


  create policy "Clients can select their own cash vouchers"
  on "public"."cash_vouchers"
  as permissive
  for select
  to authenticated
using ((partner_id = ( SELECT p.id
   FROM partners p
  WHERE (p.id = cash_vouchers.partner_id))));



  create policy "Manager can manage cash vouchers"
  on "public"."cash_vouchers"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



  create policy "Clients can check their own partnership"
  on "public"."partners"
  as permissive
  for select
  to authenticated
using ((id IN ( SELECT cv.partner_id
   FROM cash_vouchers cv
  WHERE (cv.partner_id = partners.id))));



  create policy "Managers can manage partners"
  on "public"."partners"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles ur
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



