alter table "public"."user_subscriptions" enable row level security;

create policy "Subcribed users can insert their own subscription"
on "public"."user_subscriptions"
as permissive
for insert
to authenticated
with check ((id = auth.uid()));


create policy "Subcribed users can update their own subscription"
on "public"."user_subscriptions"
as permissive
for update
to authenticated
using ((id = auth.uid()))
with check ((id = auth.uid()));


create policy "Subcribed users can view their own subscription"
on "public"."user_subscriptions"
as permissive
for select
to authenticated
using ((id = auth.uid()));



