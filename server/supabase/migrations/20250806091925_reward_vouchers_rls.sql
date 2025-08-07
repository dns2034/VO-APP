create policy "Client can update own reward vouchers"
on "public"."reward_vouchers"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));


create policy "Client can update their own reward vouchers"
on "public"."reward_vouchers"
as permissive
for update
to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



