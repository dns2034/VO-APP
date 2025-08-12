drop policy "Client can view their own bookings" on "public"."bookings";

create policy "Clients can view bookings"
on "public"."bookings"
as permissive
for select
to authenticated
using (true);



