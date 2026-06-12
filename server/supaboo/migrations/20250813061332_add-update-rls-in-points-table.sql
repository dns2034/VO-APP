create policy "Clients can update points"
on "public"."points"
as permissive
for update
to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



