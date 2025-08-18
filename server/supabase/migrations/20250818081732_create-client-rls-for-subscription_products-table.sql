create policy "Clients can view their subscription products"
on "public"."subscription_products"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_subscriptions
  WHERE ((user_subscriptions.subscription_id = subscription_products.subscription_id) AND (user_subscriptions.user_id = auth.uid())))));



