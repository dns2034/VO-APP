drop trigger if exists "set_reward_voucher_code" on "public"."reward_vouchers";

revoke delete on table "public"."available_points" from "anon";

revoke insert on table "public"."available_points" from "anon";

revoke references on table "public"."available_points" from "anon";

revoke select on table "public"."available_points" from "anon";

revoke trigger on table "public"."available_points" from "anon";

revoke truncate on table "public"."available_points" from "anon";

revoke update on table "public"."available_points" from "anon";

revoke delete on table "public"."available_points" from "authenticated";

revoke insert on table "public"."available_points" from "authenticated";

revoke references on table "public"."available_points" from "authenticated";

revoke select on table "public"."available_points" from "authenticated";

revoke trigger on table "public"."available_points" from "authenticated";

revoke truncate on table "public"."available_points" from "authenticated";

revoke update on table "public"."available_points" from "authenticated";

revoke delete on table "public"."available_points" from "service_role";

revoke insert on table "public"."available_points" from "service_role";

revoke references on table "public"."available_points" from "service_role";

revoke select on table "public"."available_points" from "service_role";

revoke trigger on table "public"."available_points" from "service_role";

revoke truncate on table "public"."available_points" from "service_role";

revoke update on table "public"."available_points" from "service_role";

alter table "public"."profiles" drop constraint "profiles_organization_id_fkey";

drop table "public"."available_points";

create table "public"."user_organizations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "organization_id" uuid not null
);


alter table "public"."user_organizations" enable row level security;

alter table "public"."bookings" drop column "booking_status";

alter table "public"."bookings" drop column "checked_in_at";

alter table "public"."bookings" drop column "checked_out_at";

alter table "public"."bookings" add column "space_id" uuid not null;

alter table "public"."bookings" add column "status" booking_status not null default 'booked'::booking_status;

alter table "public"."bookings" alter column "booked_by" set default auth.uid();

alter table "public"."bookings" alter column "id" drop identity;

alter table "public"."bookings" drop column "id";

alter table "public"."bookings" add column "id" uuid not null default gen_random_uuid();

alter table "public"."points" enable row level security;

alter table "public"."product_vouchers" drop column "status";

alter table "public"."product_vouchers" add column "status" voucher_status not null default 'active'::voucher_status;

alter table "public"."product_vouchers" alter column "status" set not null;

alter table "public"."product_vouchers" alter column "user_id" drop not null;

alter table "public"."product_vouchers" enable row level security;

alter table "public"."profiles" drop column "organization_id";

alter table "public"."reward_vouchers" alter column "code" drop not null;

alter table "public"."reward_vouchers" alter column "user_id" drop not null;

alter table "public"."reward_vouchers" enable row level security;

alter table "public"."spaces" alter column "is_available" set default true;

CREATE UNIQUE INDEX spaces_name_key ON public.spaces USING btree (name);

CREATE UNIQUE INDEX user_organization_pkey ON public.user_organizations USING btree (id);

CREATE UNIQUE INDEX user_organizations_user_id_key ON public.user_organizations USING btree (user_id);

alter table "public"."user_organizations" add constraint "user_organization_pkey" PRIMARY KEY using index "user_organization_pkey";

alter table "public"."bookings" add constraint "bookings_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bookings" validate constraint "bookings_space_id_fkey";

alter table "public"."spaces" add constraint "spaces_name_key" UNIQUE using index "spaces_name_key";

alter table "public"."user_organizations" add constraint "user_organization_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_organizations" validate constraint "user_organization_organization_id_fkey";

alter table "public"."user_organizations" add constraint "user_organization_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."user_organizations" validate constraint "user_organization_user_id_fkey";

alter table "public"."user_organizations" add constraint "user_organizations_user_id_key" UNIQUE using index "user_organizations_user_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.redeem_product_voucher()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  required_credits int;
  available_credits int;
  product_name text;
  remaining int;
  r record;
BEGIN
  -- 1. Get the required credits from the product
  SELECT price INTO required_credits
  FROM products
  WHERE id = NEW.product_id;

  -- 2. Count how many active credits the user has
  SELECT COUNT(*) INTO available_credits
  FROM public.credits
  WHERE user_id = NEW.user_id AND status = 'active';

SELECT name from products where id = NEW.product_id into product_name;
  -- 3. Check if user has enough
  IF available_credits < required_credits THEN
    RAISE EXCEPTION 'You do not have enough credits to redeem %',
      product_name;
  END IF;

  -- 4. Deduct the required number of credits from the oldest active rows
  remaining := required_credits;

  FOR r IN
    SELECT id
    FROM public.credits
    WHERE user_id = NEW.user_id AND status = 'active'
    ORDER BY created_at ASC
    FOR UPDATE SKIP LOCKED
  LOOP
    EXIT WHEN remaining <= 0;

    UPDATE public.credits
    SET status = 'used'
    WHERE id = r.id;

    remaining := remaining - 1;
  END LOOP;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.redeem_reward_voucher()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  required_points int;
  available_points int;
  remaining int;
  reward_name text;
  r record;
BEGIN
  -- 1. Get the required points from the reward
  SELECT price INTO required_points
  FROM rewards
  WHERE id = NEW.reward_id;

  SELECT name from rewards where id = NEW.reward_id into reward_name;
  -- 2. Count how many active points the user has
  SELECT COUNT(*) INTO available_points
  FROM public.points
  WHERE user_id = NEW.user_id AND status = 'active';

  -- 3. Check if user has enough
  IF available_points < required_points THEN
    RAISE EXCEPTION 'You do not have enough points to redeem %',
      reward_name;
  END IF;

  -- 4. Deduct the required number of points from the oldest active rows
  remaining := required_points;

  FOR r IN
    SELECT id
    FROM public.points
    WHERE user_id = NEW.user_id AND status = 'active'
    ORDER BY created_at ASC
    FOR UPDATE SKIP LOCKED
  LOOP
    EXIT WHEN remaining <= 0;

    UPDATE public.points
    SET status = 'used'
    WHERE id = r.id;

    remaining := remaining - 1;
  END LOOP;

  RETURN NEW;
END;
$function$
;

grant delete on table "public"."user_organizations" to "anon";

grant insert on table "public"."user_organizations" to "anon";

grant references on table "public"."user_organizations" to "anon";

grant select on table "public"."user_organizations" to "anon";

grant trigger on table "public"."user_organizations" to "anon";

grant truncate on table "public"."user_organizations" to "anon";

grant update on table "public"."user_organizations" to "anon";

grant delete on table "public"."user_organizations" to "authenticated";

grant insert on table "public"."user_organizations" to "authenticated";

grant references on table "public"."user_organizations" to "authenticated";

grant select on table "public"."user_organizations" to "authenticated";

grant trigger on table "public"."user_organizations" to "authenticated";

grant truncate on table "public"."user_organizations" to "authenticated";

grant update on table "public"."user_organizations" to "authenticated";

grant delete on table "public"."user_organizations" to "service_role";

grant insert on table "public"."user_organizations" to "service_role";

grant references on table "public"."user_organizations" to "service_role";

grant select on table "public"."user_organizations" to "service_role";

grant trigger on table "public"."user_organizations" to "service_role";

grant truncate on table "public"."user_organizations" to "service_role";

grant update on table "public"."user_organizations" to "service_role";

create policy "Enable select authenticated user"
on "public"."bookings"
as permissive
for select
to public
using ((booked_by = auth.uid()));


create policy "Enables insert"
on "public"."bookings"
as permissive
for insert
to public
with check ((booked_by = auth.uid()));


create policy "Read branches by organization membership"
on "public"."branches"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations
  WHERE ((user_organizations.organization_id = branches.organization_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Client can view their points"
on "public"."points"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Enable select for authenticated"
on "public"."product_vouchers"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Enables insert for authenticated"
on "public"."product_vouchers"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


create policy "Enable select for client"
on "public"."reward_vouchers"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Read spaces by organization membership"
on "public"."spaces"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (branches
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((branches.id = spaces.branch_id) AND (user_organizations.user_id = auth.uid())))));


create policy "Enable select"
on "public"."user_organizations"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));



