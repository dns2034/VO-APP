alter table "public"."profiles" enable row level security;

create policy "Client can access their own profile"
on "public"."profiles"
as permissive
for all
to authenticated
using ((id = auth.uid()))
with check ((id = auth.uid()));



