drop policy "Clients can view businesses inside their organization" on "public"."businesses";

drop policy "Clients can view their reward vouchers" on "public"."reward_vouchers";

create policy "Clients can view businesses inside their organization"
on "public"."businesses"
as permissive
for select
to authenticated
using (true);


create policy "Clients can view their reward vouchers"
on "public"."reward_vouchers"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));



