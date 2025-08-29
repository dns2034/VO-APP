-- ===============================
-- STEP 1: DROP OLD POLICIES
-- ===============================
-- Bookings
DROP POLICY IF EXISTS "Managers can insert bookings for clients in the same orgs" ON public.bookings;
DROP POLICY IF EXISTS "Managers can update bookings under their organization" ON public.bookings;
DROP POLICY IF EXISTS "Managers can view bookings under their organization" ON public.bookings;
DROP POLICY IF EXISTS "Clients can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Managers can delete bookings under their organization" ON public.bookings;

-- Branches
DROP POLICY IF EXISTS "Clients can view branches from their organization" ON public.branches;
DROP POLICY IF EXISTS "Managers can manage branch under their organization" ON public.branches;

-- Cash Vouchers
DROP POLICY IF EXISTS "Manager can manage cash vouchers" ON public.cash_vouchers;

-- Organizations
DROP POLICY IF EXISTS "Managers can view their organization" ON public.organizations;

-- Points
DROP POLICY IF EXISTS "Managers can manage points under their branch and  organization" ON public.points;

-- Products
DROP POLICY IF EXISTS "Clients can view all products " ON public.products;
DROP POLICY IF EXISTS "Managers can manage products under their organization" ON public.products;

-- Referrals
DROP POLICY IF EXISTS "Managers can delete referrals under their branch and organizati" ON public.referrals;
DROP POLICY IF EXISTS "Managers can update referrals under their branch and organizati" ON public.referrals;
DROP POLICY IF EXISTS "Managers can view referrals under their branch and  organizatio" ON public.referrals;

-- Space Availability
DROP POLICY IF EXISTS "Manager can manage space availability under  their organization" ON public.space_availability;
DROP POLICY IF EXISTS "Clients can view availability only for spaces in their org" ON public.space_availability;

-- Space Units
DROP POLICY IF EXISTS "Clients can view space units in their org" ON public.space_units;
DROP POLICY IF EXISTS "Managers can manage space units under their organization" ON public.space_units;

-- User Organizations
DROP POLICY IF EXISTS "Enable select user organizations" ON public.user_organizations;

-- User Subscriptions
DROP POLICY IF EXISTS "Clients can view their own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Managers can manage user subscriptions under their organization" ON public.user_subscriptions;

-- Booking Cancellations
DROP POLICY IF EXISTS "Clients can make booking cancellation" ON public.booking_cancellations;
DROP POLICY IF EXISTS "Clients can view their own booking cancellations" ON public.booking_cancellations;
DROP POLICY IF EXISTS "Managers can view booking cancellations under their organizatio" ON public.booking_cancellations;

-- Businesses
DROP POLICY IF EXISTS "Clients can update their businesses" ON public.businesses;
DROP POLICY IF EXISTS "Clients can view businesses inside their organization" ON public.businesses;
DROP POLICY IF EXISTS "Managers can manage businesses under their branch and organizat" ON public.businesses;

-- Credits
DROP POLICY IF EXISTS "Managers can manage credits under their organization" ON public.credits;

-- Product Vouchers
DROP POLICY IF EXISTS "Manager can manage product vouchers under their organization" ON public.product_vouchers;

-- Profiles
DROP POLICY IF EXISTS "Clients can access their own profile" ON public.profiles;

-- Reward Vouchers
DROP POLICY IF EXISTS "Clients can redeem their own reward vouchers" ON public.reward_vouchers;
DROP POLICY IF EXISTS "Clients can update their own reward vouchers" ON public.reward_vouchers;
DROP POLICY IF EXISTS "Managers can manage reward vouchers under their organization" ON public.reward_vouchers;

-- Rewards
DROP POLICY IF EXISTS "Clients can view all rewards" ON public.rewards;
DROP POLICY IF EXISTS "Managers can manage rewards under their branch and organization" ON public.rewards;

-- Spaces
DROP POLICY IF EXISTS "Clients can view spaces in their organization" ON public.spaces;
DROP POLICY IF EXISTS "Managers can manage spaces under their organization" ON public.spaces;

-- Subscription Products
DROP POLICY IF EXISTS "Clients can view their own subscription products" ON public.subscription_products;
DROP POLICY IF EXISTS "Managers can manage subscription products under their org" ON public.subscription_products;

-- Subscriptions
DROP POLICY IF EXISTS "Clients can view subscription plans" ON public.subscriptions;
DROP POLICY IF EXISTS "Managers can manage subscriptions under their branch and org" ON public.subscriptions;

-- User Landing Pages
DROP POLICY IF EXISTS "Managers can manage user landing pages within their org" ON public.user_landing_pages;

-- User Roles
DROP POLICY IF EXISTS "Managers can view user roles under their organization" ON public.user_roles;

-- ===============================
-- STEP 2: DROP FUNCTIONS/TRIGGERS
-- ===============================
DROP TRIGGER IF EXISTS trigger_submit_booking ON public.bookings;
DROP FUNCTION IF EXISTS public.is_manager(uuid);
DROP FUNCTION IF EXISTS public.get_booking_with_user();
DROP FUNCTION IF EXISTS public.submit_booking();
DROP FUNCTION IF EXISTS public.set_space_unit_status(uuid, public.space_units_status);

-- ===============================
-- STEP 3: ALTER TABLES & TYPES
-- ===============================
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;
ALTER TABLE public.user_roles DROP COLUMN role;

-- Enum surgery
ALTER TYPE public.roles RENAME TO roles__old_version_to_be_dropped;
CREATE TYPE public.roles AS ENUM ('manager', 'client', 'superadmin', 'participant');
DROP TYPE public.roles__old_version_to_be_dropped;

-- Restore column with new type
ALTER TABLE public.user_roles ADD COLUMN role public.roles;

-- Cash vouchers refactor
ALTER TABLE public.cash_vouchers DROP COLUMN IF EXISTS partner_id;
ALTER TABLE public.cash_vouchers ADD COLUMN user_id uuid;

-- Profiles.role with new enum
ALTER TABLE public.profiles ADD COLUMN role public.roles;

-- User roles column relax
ALTER TABLE public.user_roles ALTER COLUMN role DROP NOT NULL;

-- Cash vouchers FK
ALTER TABLE public.cash_vouchers 
  ADD CONSTRAINT cash_vouchers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) NOT VALID;
ALTER TABLE public.cash_vouchers VALIDATE CONSTRAINT cash_vouchers_user_id_fkey;

-- ===============================
-- STEP 4: RECREATE FUNCTIONS
-- ===============================
CREATE OR REPLACE FUNCTION public.is_manager(p_user uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  select exists (
    select 1
    from user_roles
    where user_id = p_user
      and role::text = 'manager'
  );
$function$;

CREATE OR REPLACE FUNCTION public.get_booking_with_user()
 RETURNS TABLE(
   booking_id uuid,
   booked_by uuid,
   booking_date date,
   start_time time with time zone,
   end_time time with time zone,
   status booking_status,
   remarks text,
   space_unit_id uuid,
   user_role text,
   user_email text,
   user_created_at timestamp with time zone
 )
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  select 
    b.id as booking_id,
    b.booked_by,
    b.date as booking_date,
    b.start_time,
    b.end_time,
    b.status,
    b.remarks,
    b.space_unit_id,
    ur.role::text as user_role,
    au.email as user_email,
    au.created_at as user_created_at
  from bookings b
  join auth.users au on au.id = b.booked_by
  left join user_roles ur on ur.user_id = b.booked_by
  where b.booked_by = auth.uid();
$function$;

CREATE OR REPLACE FUNCTION public.submit_booking()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
AS $function$
declare 
    v_product_id UUID;
    v_product_duration SMALLINT;
    v_opening TIME WITH TIME ZONE;
    v_closing TIME WITH TIME ZONE;
    v_user_role public.roles;
    v_is_manager boolean;
begin
    -- Step 0: Access control
    IF NEW.booked_by = auth.uid() THEN
      NULL; 
    ELSE
      SELECT EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN user_organizations uo ON uo.user_id = ur.user_id
        JOIN branches br ON br.organization_id = uo.organization_id
        JOIN spaces s ON s.branch_id = br.id
        JOIN space_units su ON su.space_id = s.id
        WHERE ur.user_id = auth.uid()
          AND ur.role = 'manager'
          AND su.id = NEW.space_unit_id
      )
      INTO v_is_manager;

      IF NOT v_is_manager THEN
        RAISE EXCEPTION 'Access denied: only client or manager of org can submit booking';
      END IF;
    END IF;

    -- Prevent past booking
    NEW := prevent_past_booking(NEW);

    -- Validate subscription rules & voucher
    NEW := handle_subscription_and_voucher(NEW);

    -- Voucher flow
    IF NEW.product_voucher_id IS NOT NULL THEN
      SELECT * INTO v_product_id, v_product_duration
      FROM get_product_info(NEW.product_voucher_id);

      SELECT * INTO v_opening, v_closing
      FROM get_space_availability(NEW.space_unit_id, NEW.date);

      SELECT * INTO NEW.start_time, NEW.end_time
      FROM assign_booking_times_by_duration(
        NEW.start_time,
        NEW.end_time,
        v_opening,
        v_closing,
        v_product_duration
      );

      PERFORM validate_time_within_bounds(
        NEW.start_time,
        NEW.end_time,
        v_opening,
        v_closing
      );

      PERFORM check_booking_overlap(
        NEW.space_unit_id,
        NEW.date,
        NEW.start_time,
        NEW.end_time
      );

      PERFORM verify_product_voucher(
        CASE WHEN v_is_manager THEN NEW.booked_by ELSE auth.uid() END,
        NEW.space_unit_id,
        NEW.start_time,
        NEW.end_time,
        NEW.product_voucher_id
      );

      PERFORM set_product_voucher_used(NEW.product_voucher_id);

    ELSE
      SELECT * INTO v_opening, v_closing
      FROM get_space_availability(NEW.space_unit_id, NEW.date);

      PERFORM validate_time_within_bounds(
        NEW.start_time,
        NEW.end_time,
        v_opening,
        v_closing
      );

      PERFORM check_booking_overlap(
        NEW.space_unit_id,
        NEW.date,
        NEW.start_time,
        NEW.end_time
      );
    END IF;

    RETURN NEW;
end;
$function$;

-- ===============================
-- STEP 5: RECREATE TRIGGERS
-- ===============================
CREATE TRIGGER trigger_submit_booking
BEFORE INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.submit_booking();

-- ===============================
-- STEP 6: RECREATE POLICIES
-- ===============================
-- [All your CREATE POLICY statements here, in the order you listed them]
-- … (I won’t repeat them here; they’re already valid)


  create policy "Managers can insert bookings for clients in their organization"
  on "public"."bookings"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((uo.user_id = ur.user_id)))
     JOIN branches b ON ((uo.organization_id = b.organization_id)))
     JOIN spaces s ON ((s.branch_id = b.id)))
     JOIN space_units su ON ((su.space_id = s.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (su.id = bookings.space_unit_id)))));



  create policy "Clients can select their own cash vouchers"
  on "public"."cash_vouchers"
  as permissive
  for select
  to authenticated
using ((user_id = auth.uid()));



  create policy "Managers can manage cash vouchers"
  on "public"."cash_vouchers"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((uo.user_id = ur.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = cash_vouchers.user_id)))))));



  create policy "Managers can manage points under their branch and organization"
  on "public"."points"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN branches b ON ((uo.organization_id = b.organization_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (b.organization_id IN ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = points.user_id)))))));



  create policy "Clients can view all products"
  on "public"."products"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((spaces s
     JOIN branches b ON ((b.id = s.branch_id)))
     JOIN user_organizations uo ON ((uo.organization_id = b.organization_id)))
  WHERE ((s.id = products.space_id) AND (uo.user_id = auth.uid())))));



  create policy "Managers can delete referrals under their organization"
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



  create policy "Managers can update referrals under their organization"
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



  create policy "Managers can view referrals under their organization"
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



  create policy "Manager can manage space availability under their organization"
  on "public"."space_availability"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (((spaces s
     JOIN branches b ON ((s.branch_id = b.id)))
     JOIN user_organizations uo ON ((b.organization_id = uo.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((s.id = space_availability.space_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



  create policy "Clients can make booking cancellation"
  on "public"."booking_cancellations"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM bookings b
  WHERE ((b.id = booking_cancellations.booking_id) AND (b.booked_by = auth.uid())))));



  create policy "Clients can view their own booking cancellations"
  on "public"."booking_cancellations"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM bookings b
  WHERE ((b.id = booking_cancellations.booking_id) AND (b.booked_by = auth.uid())))));



  create policy "Managers can view booking cancellations under their organizatio"
  on "public"."booking_cancellations"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (((((user_roles ur
     JOIN user_organizations uo ON ((uo.user_id = ur.user_id)))
     JOIN bookings b ON ((b.id = booking_cancellations.booking_id)))
     JOIN space_units su ON ((su.id = b.space_unit_id)))
     JOIN spaces s ON ((s.id = su.space_id)))
     JOIN branches br ON ((br.id = s.branch_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = br.organization_id)))));



  create policy "Clients can view bookings"
  on "public"."bookings"
  as permissive
  for select
  to authenticated
using ((booked_by = auth.uid()));



  create policy "Managers can delete bookings under their organization"
  on "public"."bookings"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN space_units su ON ((su.id = bookings.space_unit_id)))
     JOIN spaces s ON ((su.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = b.organization_id)))));



  create policy "Managers can manage branch under their organization"
  on "public"."branches"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = branches.organization_id)))));



  create policy "Clients can update their businesses"
  on "public"."businesses"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "Clients can view businesses inside their organization"
  on "public"."businesses"
  as permissive
  for select
  to authenticated
using (((user_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM (user_organizations uo
     JOIN user_organizations owner_org ON ((uo.organization_id = owner_org.organization_id)))
  WHERE ((uo.user_id = auth.uid()) AND (owner_org.user_id = businesses.user_id))))));



  create policy "Managers can manage businesses under their branch and organizat"
  on "public"."businesses"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN user_organizations owner_org ON ((owner_org.organization_id = uo.organization_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (owner_org.user_id = businesses.user_id)))))
with check ((EXISTS ( SELECT 1
   FROM ((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN user_organizations owner_org ON ((owner_org.organization_id = uo.organization_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (owner_org.user_id = businesses.user_id)))));



  create policy "Managers can manage credits under their organization"
  on "public"."credits"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN branches b ON ((uo.organization_id = b.organization_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (b.id IN ( SELECT br.id
           FROM (branches br
             JOIN user_organizations uo2 ON ((br.organization_id = uo2.organization_id)))
          WHERE (uo2.user_id = credits.user_id)))))));



  create policy "Manager can manage product vouchers under their organization"
  on "public"."product_vouchers"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((products p
     JOIN spaces s ON ((p.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
     JOIN user_organizations uo ON ((b.organization_id = uo.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((p.id = product_vouchers.product_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



  create policy "Managers can manage products under their organization"
  on "public"."products"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (((spaces s
     JOIN branches b ON ((b.id = s.branch_id)))
     JOIN user_organizations uo ON ((uo.organization_id = b.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((s.id = products.space_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



  create policy "Clients can access their own profile"
  on "public"."profiles"
  as permissive
  for select
  to authenticated
using ((id = auth.uid()));



  create policy "Clients can redeem their own reward vouchers"
  on "public"."reward_vouchers"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "Clients can update their own reward vouchers"
  on "public"."reward_vouchers"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "Managers can manage reward vouchers under their organization"
  on "public"."reward_vouchers"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (((rewards r
     JOIN organizations o ON ((r.organization_id = o.id)))
     JOIN user_organizations uo ON ((uo.organization_id = o.id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((r.id = reward_vouchers.reward_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



  create policy "Clients can view all rewards"
  on "public"."rewards"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations uo
  WHERE ((uo.organization_id = rewards.organization_id) AND (uo.user_id = auth.uid())))));



  create policy "Managers can manage rewards under their branch and organization"
  on "public"."rewards"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = rewards.organization_id)))));



  create policy "Clients can view availability only for spaces in their org"
  on "public"."space_availability"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((spaces s
     JOIN branches b ON ((b.id = s.branch_id)))
     JOIN user_organizations uo ON ((b.organization_id = uo.organization_id)))
  WHERE ((s.id = space_availability.space_id) AND (uo.user_id = auth.uid())))));



  create policy "Managers can manage space units under their organization"
  on "public"."space_units"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (((spaces s
     JOIN branches b ON ((s.branch_id = b.id)))
     JOIN user_organizations uo ON ((b.organization_id = uo.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((s.id = space_units.space_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



  create policy "Clients can view spaces in their organization"
  on "public"."spaces"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (branches b
     JOIN user_organizations uo ON ((b.organization_id = uo.organization_id)))
  WHERE ((b.id = spaces.branch_id) AND (uo.user_id = auth.uid())))));



  create policy "Managers can manage spaces under their organization"
  on "public"."spaces"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((branches b
     JOIN user_organizations uo ON ((b.organization_id = uo.organization_id)))
     JOIN user_roles ur ON ((ur.user_id = uo.user_id)))
  WHERE ((b.id = spaces.branch_id) AND (ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles)))));



  create policy "Clients can view their own subscription products"
  on "public"."subscription_products"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM user_subscriptions us
  WHERE ((us.subscription_id = subscription_products.subscription_id) AND (us.user_id = auth.uid())))));



  create policy "Managers can manage subscription products under their org"
  on "public"."subscription_products"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM ((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN subscriptions s ON ((s.id = subscription_products.subscription_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = s.organization_id)))));



  create policy "Clients can view subscription plans"
  on "public"."subscriptions"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations uo
  WHERE ((uo.organization_id = subscriptions.organization_id) AND (uo.user_id = auth.uid())))));



  create policy "Managers can manage subscriptions under their branch and org"
  on "public"."subscriptions"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = subscriptions.organization_id)))));



  create policy "Managers can manage user landing pages within their org"
  on "public"."user_landing_pages"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id IN ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = user_landing_pages.user_id)))))));



  create policy "Managers can view user roles under their organization"
  on "public"."user_roles"
  as permissive
  for select
  to authenticated
using (((role = 'manager'::roles) AND (EXISTS ( SELECT 1
   FROM user_organizations uo
  WHERE ((uo.user_id = auth.uid()) AND (uo.organization_id IN ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = user_roles.user_id))))))));



  create policy "Managers can manage user subscriptions under their organization"
  on "public"."user_subscriptions"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = user_subscriptions.organization_id)))));



