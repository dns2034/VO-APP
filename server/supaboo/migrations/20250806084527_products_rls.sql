drop policy "Enable select authenticated user" on "public"."bookings";

drop policy "Client can view their points" on "public"."points";

alter table "public"."products" enable row level security;

create policy "Client can update their own bookings"
on "public"."bookings"
as permissive
for select
to public
using ((booked_by = auth.uid()));


create policy "Authenticated user can view products"
on "public"."products"
as permissive
for select
to anon
using (true);


create policy "Client can view their points"
on "public"."points"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));



