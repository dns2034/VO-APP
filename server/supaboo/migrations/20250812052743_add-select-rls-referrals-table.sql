create policy "Clients can view their referrals"
on "public"."referrals"
as permissive
for select
to authenticated
using ((referred_by = auth.uid()));



