drop policy "Clients can view their own subscriptions" on "public"."user_subscriptions";

alter table "public"."amenities" enable row level security;

create policy "Clients can view amenities in their organization"
on "public"."amenities"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (branches
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((branches.id = amenities.branch_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Clients can view their own subscriptions"
on "public"."user_subscriptions"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));



