create policy "Client can insert points"
on "public"."points"
as permissive
for insert
to public
with check ((user_id = auth.uid()));



