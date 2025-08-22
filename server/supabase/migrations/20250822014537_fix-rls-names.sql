drop policy "Client can insert their own cancellation" on "public"."booking_cancellations";

drop policy "Client can view their own booking cancellations" on "public"."booking_cancellations";

drop policy "Managers can view cancellations in their org" on "public"."booking_cancellations";

drop policy "Client can create their own bookings" on "public"."bookings";

drop policy "Client can delete their own bookings" on "public"."bookings";

drop policy "Client can update their own bookings" on "public"."bookings";

drop policy "Managers can delete in their org" on "public"."bookings";

drop policy "Managers can insert bookings for same org clients" on "public"."bookings";

drop policy "Managers can update bookings in their org" on "public"."bookings";

drop policy "Managers can view bookings in their org" on "public"."bookings";

drop policy "Manager can manage branches in their org" on "public"."branches";

drop policy "Read branches by organization membership" on "public"."branches";

drop policy "Manager can manage businesses in their org" on "public"."businesses";

drop policy "Manager can manage credits in their org" on "public"."credits";

drop policy "Client can insert points" on "public"."points";

drop policy "Client can view their points" on "public"."points";

drop policy "Clients can update points" on "public"."points";

drop policy "Manager can manage points in their orgs" on "public"."points";

drop policy "Client can insert their own product vouchers" on "public"."product_vouchers";

drop policy "Client can update their product voucher" on "public"."product_vouchers";

drop policy "Enable select for authenticated" on "public"."product_vouchers";

drop policy "Manager can manage products voucher in their org" on "public"."product_vouchers";

drop policy "Authenticated user can view products" on "public"."products";

drop policy "Managers can manage products" on "public"."products";

drop policy "Client can access their own profile" on "public"."profiles";

drop policy "Enable insert" on "public"."referrals";

drop policy "Managers can delete referrals in their org" on "public"."referrals";

drop policy "Managers can update referrals in their org" on "public"."referrals";

drop policy "Managers can view referrals in their org" on "public"."referrals";

drop policy "Client can redeem their own reward vouchers" on "public"."reward_vouchers";

drop policy "Client can update their own reward vouchers" on "public"."reward_vouchers";

drop policy "Clients can view their reward vouchers" on "public"."reward_vouchers";

drop policy "Managers can manage reward vouchers in their org" on "public"."reward_vouchers";

drop policy "All users can view rewards" on "public"."rewards";

drop policy "Managers can manage rewards" on "public"."rewards";

drop policy "Manager can manage space availability in their org" on "public"."space_availability";

drop policy "Clients can view units of spaces they belong to" on "public"."space_units";

drop policy "Managers can manage space units" on "public"."space_units";

drop policy "Managers can manage spaces" on "public"."spaces";

drop policy "Read spaces by organization membership" on "public"."spaces";

drop policy "Clients can view their subscription products" on "public"."subscription_products";

drop policy "Managers can manage subscription products" on "public"."subscription_products";

drop policy "All users can view subscription plans" on "public"."subscriptions";

drop policy "Managers can manage subscriptions" on "public"."subscriptions";

drop policy "Enable user to select their landing_page" on "public"."user_landing_pages";

drop policy "Manager can manage user landing pages within their org" on "public"."user_landing_pages";

drop policy "Enable select" on "public"."user_organizations";

drop policy "Managers can view user_roles in their org" on "public"."user_roles";

drop policy "Users can view their own role" on "public"."user_roles";

drop policy "Managers can manage user subscriptions in their org" on "public"."user_subscriptions";

create policy "Clients can make booking cancellation"
on "public"."booking_cancellations"
as permissive
for insert
to authenticated
with check ((cancelled_by = auth.uid()));


create policy "Clients can view their own booking cancellations"
on "public"."booking_cancellations"
as permissive
for select
to authenticated
using ((cancelled_by = auth.uid()));


create policy "Managers can view booking cancellations under their organizatio"
on "public"."booking_cancellations"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (((((user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
     JOIN bookings ON ((bookings.id = booking_cancellations.booking_id)))
     JOIN space_units ON ((space_units.id = bookings.space_unit_id)))
     JOIN spaces ON ((spaces.id = space_units.space_id)))
     JOIN branches ON ((branches.id = spaces.branch_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));


create policy "Clients can create their own bookings"
on "public"."bookings"
as permissive
for insert
to authenticated
with check ((booked_by = auth.uid()));


create policy "Clients can delete their own bookings"
on "public"."bookings"
as permissive
for delete
to authenticated
using ((booked_by = auth.uid()));


create policy "Clients can update their own bookings"
on "public"."bookings"
as permissive
for update
to authenticated
using ((booked_by = auth.uid()))
with check ((booked_by = auth.uid()));


create policy "Managers can delete bookings under their organization"
on "public"."bookings"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN space_units su ON ((bookings.space_unit_id = su.id)))
     JOIN spaces s ON ((su.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = b.organization_id)))));


create policy "Managers can insert bookings for clients in the same orgs"
on "public"."bookings"
as permissive
for insert
to authenticated
with check (((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((uo.user_id = ur.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id IN ( SELECT branches.organization_id
           FROM ((space_units su
             JOIN spaces s ON ((s.id = su.space_id)))
             JOIN branches ON ((branches.id = s.branch_id)))
          WHERE (su.id = bookings.space_unit_id)))))) AND (EXISTS ( SELECT 1
   FROM user_organizations client_org
  WHERE ((client_org.user_id = bookings.booked_by) AND (client_org.organization_id IN ( SELECT branches.organization_id
           FROM ((space_units su
             JOIN spaces s ON ((s.id = su.space_id)))
             JOIN branches ON ((branches.id = s.branch_id)))
          WHERE (su.id = bookings.space_unit_id))))))));


create policy "Managers can update bookings under their organization"
on "public"."bookings"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN space_units su ON ((bookings.space_unit_id = su.id)))
     JOIN spaces s ON ((su.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = b.organization_id)))));


create policy "Managers can view bookings under their organization"
on "public"."bookings"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN space_units su ON ((bookings.space_unit_id = su.id)))
     JOIN spaces s ON ((su.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = b.organization_id)))));


create policy "Clients can view branches from their organization"
on "public"."branches"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations
  WHERE ((user_organizations.organization_id = branches.organization_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Managers can manage branch under their organization"
on "public"."branches"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));


create policy "Managers can manage businesses under their branch and organizat"
on "public"."businesses"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
     JOIN user_organizations owner_org ON ((owner_org.organization_id = user_organizations.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (owner_org.user_id = businesses.user_id)))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
     JOIN user_organizations owner_org ON ((owner_org.organization_id = user_organizations.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (owner_org.user_id = businesses.user_id)))));


create policy "Managers can manage credits under their organization"
on "public"."credits"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = credits.user_id)))))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = credits.user_id)))))));


create policy "Clients can insert their own points"
on "public"."points"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));


create policy "Clients can update their own points"
on "public"."points"
as permissive
for update
to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));


create policy "Clients can view their own points"
on "public"."points"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Managers can manage points under their branch and  organization"
on "public"."points"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = points.user_id)))))));


create policy "Client can update their own product vouchers"
on "public"."product_vouchers"
as permissive
for update
to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));


create policy "Clients can insert their own product vouchers"
on "public"."product_vouchers"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));


create policy "Clients can view their own product vouchers"
on "public"."product_vouchers"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Manager can manage product vouchers under their organization"
on "public"."product_vouchers"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((products
     JOIN spaces ON ((products.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
     JOIN user_organizations ON ((branches.organization_id = user_organizations.organization_id)))
     JOIN user_roles ON ((user_organizations.user_id = user_roles.user_id)))
  WHERE ((products.id = product_vouchers.product_id) AND (user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles)))))
with check ((EXISTS ( SELECT 1
   FROM ((((products
     JOIN spaces ON ((products.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
     JOIN user_organizations ON ((branches.organization_id = user_organizations.organization_id)))
     JOIN user_roles ON ((user_organizations.user_id = user_roles.user_id)))
  WHERE ((products.id = product_vouchers.product_id) AND (user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles)))));


create policy "Clients can view all products "
on "public"."products"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = products.space_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Managers can manage products under their organization"
on "public"."products"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN spaces ON ((products.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN spaces ON ((products.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));


create policy "Clients can access their own profile"
on "public"."profiles"
as permissive
for all
to authenticated
using ((id = auth.uid()))
with check ((id = auth.uid()));


create policy "Clients can make referrals"
on "public"."referrals"
as permissive
for insert
to authenticated
with check ((referred_by = auth.uid()));


create policy "Managers can delete referrals under their branch and organizati"
on "public"."referrals"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id IN ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = referrals.referred_by)))))));


create policy "Managers can update referrals under their branch and organizati"
on "public"."referrals"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id IN ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = referrals.referred_by)))))));


create policy "Managers can view referrals under their branch and  organizatio"
on "public"."referrals"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id IN ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = referrals.referred_by)))))));


create policy "Clients can redeem their own reward vouchers"
on "public"."reward_vouchers"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM (rewards
     JOIN user_organizations ON ((user_organizations.organization_id = rewards.organization_id)))
  WHERE ((rewards.id = reward_vouchers.reward_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Clients can update their own reward vouchers"
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


create policy "Clients can view their own reward vouchers"
on "public"."reward_vouchers"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Managers can manage reward vouchers under their organization"
on "public"."reward_vouchers"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((rewards r
     JOIN user_organizations uo ON ((uo.organization_id = r.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((r.id = reward_vouchers.reward_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))))
with check ((EXISTS ( SELECT 1
   FROM ((rewards r
     JOIN user_organizations uo ON ((uo.organization_id = r.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((r.id = reward_vouchers.reward_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));


create policy "Clients can view all rewards"
on "public"."rewards"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations
  WHERE ((user_organizations.organization_id = rewards.organization_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Managers can manage rewards under their branch and organization"
on "public"."rewards"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = rewards.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = rewards.organization_id)))));


create policy "Manager can manage space availability under  their organization"
on "public"."space_availability"
as permissive
for all
to authenticated
using (((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = space_availability.space_id) AND (user_organizations.user_id = auth.uid())))) AND (EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles))))))
with check (((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = space_availability.space_id) AND (user_organizations.user_id = auth.uid())))) AND (EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles))))));


create policy "Clients can view space units in their org"
on "public"."space_units"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = space_units.space_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Managers can manage space units under their organization"
on "public"."space_units"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN spaces ON ((space_units.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN spaces ON ((space_units.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));


create policy "Clients can view spaces in their organization"
on "public"."spaces"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (branches
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((branches.id = spaces.branch_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Managers can manage spaces under their organization"
on "public"."spaces"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));


create policy "Clients can view their own subscription products"
on "public"."subscription_products"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_subscriptions
  WHERE ((user_subscriptions.subscription_id = subscription_products.subscription_id) AND (user_subscriptions.user_id = auth.uid())))));


create policy "Managers can manage subscription products under their org"
on "public"."subscription_products"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN subscriptions ON ((subscription_products.subscription_id = subscriptions.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = subscriptions.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN subscriptions ON ((subscription_products.subscription_id = subscriptions.id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = subscriptions.organization_id)))));


create policy "Clients can view subscription plans"
on "public"."subscriptions"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations
  WHERE ((user_organizations.organization_id = subscriptions.organization_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Managers can manage subscriptions under their branch and org"
on "public"."subscriptions"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = subscriptions.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = subscriptions.organization_id)))));


create policy "Enable user to view their landing_page"
on "public"."user_landing_pages"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Managers can manage user landing pages within their org"
on "public"."user_landing_pages"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = user_landing_pages.user_id)))))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
     JOIN branches ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (branches.id IN ( SELECT branches_1.id
           FROM (branches branches_1
             JOIN user_organizations user_organizations_1 ON ((branches_1.organization_id = user_organizations_1.organization_id)))
          WHERE (user_organizations_1.user_id = user_landing_pages.user_id)))))));


create policy "Enable select user organizations"
on "public"."user_organizations"
as permissive
for select
to authenticated
using (true);


create policy "Clients can view their own role"
on "public"."user_roles"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Managers can view user roles under their organization"
on "public"."user_roles"
as permissive
for select
to authenticated
using ((is_manager(auth.uid()) AND (EXISTS ( SELECT 1
   FROM (user_organizations muo
     JOIN user_organizations cuo ON ((muo.organization_id = cuo.organization_id)))
  WHERE ((muo.user_id = auth.uid()) AND (cuo.user_id = user_roles.user_id))))));


create policy "Managers can manage user subscriptions under their organization"
on "public"."user_subscriptions"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = user_subscriptions.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = user_subscriptions.organization_id)))));



