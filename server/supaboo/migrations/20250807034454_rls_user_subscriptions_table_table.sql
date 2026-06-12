drop policy "Subcribed users can insert their own subscription" on "public"."user_subscriptions";

drop policy "Subcribed users can update their own subscription" on "public"."user_subscriptions";

drop policy "Subcribed users can view their own subscription" on "public"."user_subscriptions";

create policy "Subcribed users can insert their own subscription"
on "public"."user_subscriptions"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM (subscriptions
     JOIN user_organizations ON ((user_organizations.organization_id = subscriptions.organization_id)))
  WHERE ((subscriptions.id = user_subscriptions.subscription_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Subcribed users can update their own subscription"
on "public"."user_subscriptions"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM (subscriptions
     JOIN user_organizations ON ((user_organizations.organization_id = subscriptions.organization_id)))
  WHERE ((subscriptions.id = user_subscriptions.subscription_id) AND (user_organizations.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM (subscriptions
     JOIN user_organizations ON ((user_organizations.organization_id = subscriptions.organization_id)))
  WHERE ((subscriptions.id = user_subscriptions.subscription_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Subcribed users can view their own subscription"
on "public"."user_subscriptions"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (subscriptions
     JOIN user_organizations ON ((user_organizations.organization_id = subscriptions.organization_id)))
  WHERE ((subscriptions.id = user_subscriptions.subscription_id) AND (user_organizations.user_id = auth.uid())))));



