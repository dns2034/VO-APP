drop policy "Client can redeem their own reward vouchers" on "public"."reward_vouchers";

drop policy "Client can update their own reward vouchers" on "public"."reward_vouchers";

drop policy "Clients can view their reward vouchers" on "public"."reward_vouchers";

create policy "Client can redeem their own reward vouchers"
on "public"."reward_vouchers"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM (rewards
     JOIN user_organizations ON ((user_organizations.organization_id = rewards.organization_id)))
  WHERE ((rewards.id = reward_vouchers.reward_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Client can update their own reward vouchers"
on "public"."reward_vouchers"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM (rewards
     JOIN user_organizations ON ((user_organizations.organization_id = rewards.organization_id)))
  WHERE ((rewards.id = reward_vouchers.reward_id) AND (user_organizations.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM (rewards
     JOIN user_organizations ON ((user_organizations.organization_id = rewards.organization_id)))
  WHERE ((rewards.id = reward_vouchers.reward_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Clients can view their reward vouchers"
on "public"."reward_vouchers"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (rewards
     JOIN user_organizations ON ((user_organizations.organization_id = rewards.organization_id)))
  WHERE ((rewards.id = reward_vouchers.reward_id) AND (user_organizations.user_id = auth.uid())))));



