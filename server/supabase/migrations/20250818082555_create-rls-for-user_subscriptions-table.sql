create policy "Clients can view their own subscriptions"
on "public"."user_subscriptions"
as permissive
for select
to public
using ((user_id = auth.uid()));



