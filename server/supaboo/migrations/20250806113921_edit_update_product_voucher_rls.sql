drop policy "Enable update" on "public"."product_vouchers";

create policy "Client can update their product voucher"
on "public"."product_vouchers"
as permissive
for update
to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



