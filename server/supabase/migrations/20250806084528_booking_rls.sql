create policy "Client can delete their own bookings"
on "public"."bookings"
as permissive
for delete
to authenticated
using ((booked_by = auth.uid()));


create policy "Client can update their own bookings"
on "public"."bookings"
as permissive
for update
to authenticated
using ((booked_by = auth.uid()))
with check ((booked_by = auth.uid()));



