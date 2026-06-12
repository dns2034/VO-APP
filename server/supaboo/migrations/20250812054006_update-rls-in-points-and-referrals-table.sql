drop policy "Client can insert points" on "public"."points";

drop policy "Enable insert" on "public"."referrals";

create policy "Client can insert points"
on "public"."points"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));


create policy "Enable insert"
on "public"."referrals"
as permissive
for insert
to authenticated
with check ((referred_by = auth.uid()));



