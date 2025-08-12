create policy "Clients can insert credits"
on "public"."credits"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));



