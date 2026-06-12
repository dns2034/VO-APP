alter table "public"."rewards" enable row level security;

create policy "All users can view rewards"
on "public"."rewards"
as permissive
for select
to authenticated
using (true);



