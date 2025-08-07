drop policy "Enables insert" on "public"."bookings";

drop policy "Client can update their own bookings" on "public"."bookings";

create policy "Client can create their own bookings"
on "public"."bookings"
as permissive
for insert
to authenticated
with check ((booked_by = auth.uid()));


create policy "Client can view their own bookings"
on "public"."bookings"
as permissive
for select
to authenticated
using ((booked_by = auth.uid()));


create policy "Client can update their own bookings"
on "public"."bookings"
as permissive
for update
to authenticated
using ((booked_by = auth.uid()))
with check ((booked_by = auth.uid()));



