alter table "public"."booking_cancellations" enable row level security;

create policy "Client can insert their own cancellation"
on "public"."booking_cancellations"
as permissive
for insert
to authenticated
with check ((cancelled_by = auth.uid()));


create policy "Client can view their own booking cancellations"
on "public"."booking_cancellations"
as permissive
for select
to authenticated
using ((cancelled_by = auth.uid()));



