drop policy "Enable user to select their landing_page" on "public"."user_landing_page";

create policy "Enable user to select their landing_page"
on "public"."user_landing_page"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));



