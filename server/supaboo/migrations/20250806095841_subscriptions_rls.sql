alter table "public"."subscriptions" enable row level security;

create policy "All users can view subscription plans"
on "public"."subscriptions"
as permissive
for select
to authenticated
using (true);



