drop policy "Enables insert for authenticated" on "public"."product_vouchers";

create policy "Client can insert their own product vouchers"
on "public"."product_vouchers"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));



