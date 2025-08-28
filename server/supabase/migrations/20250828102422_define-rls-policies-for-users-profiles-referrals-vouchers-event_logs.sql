alter table "public"."event_logs" enable row level security;

create policy "service_role_cash_vouchers_write"
on "public"."cash_vouchers"
as permissive
for all
to service_role
using (true)
with check (true);


create policy "service_role_event_logs_write"
on "public"."event_logs"
as permissive
for all
to service_role
using (true)
with check (true);


create policy "service_role_product_vouchers_write"
on "public"."product_vouchers"
as permissive
for all
to service_role
using (true)
with check (true);


create policy "service_role_profiles_write"
on "public"."profiles"
as permissive
for all
to service_role
using (true)
with check (true);


create policy "service_role_referrals_write"
on "public"."referrals"
as permissive
for all
to service_role
using (true)
with check (true);


create policy "service_role_users_write"
on "public"."user_roles"
as permissive
for all
to service_role
using (true)
with check (true);



