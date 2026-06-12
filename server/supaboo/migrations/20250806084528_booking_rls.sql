create policy "Client can delete their own bookings"
on "public"."bookings"
as permissive
for delete
to authenticated
using ((booked_by = auth.uid()));





