drop policy "Client can update own reward vouchers" on "public"."reward_vouchers";

drop policy "Enable select for client" on "public"."reward_vouchers";

create policy "Client can redeem their own reward vouchers"
on "public"."reward_vouchers"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));


create policy "Clients can view their reward vouchers"
on "public"."reward_vouchers"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));



