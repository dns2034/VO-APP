drop trigger if exists "set_voucher_code" on "public"."vouchers";

revoke delete on table "public"."vouchers" from "anon";

revoke insert on table "public"."vouchers" from "anon";

revoke references on table "public"."vouchers" from "anon";

revoke select on table "public"."vouchers" from "anon";

revoke trigger on table "public"."vouchers" from "anon";

revoke truncate on table "public"."vouchers" from "anon";

revoke update on table "public"."vouchers" from "anon";

revoke delete on table "public"."vouchers" from "authenticated";

revoke insert on table "public"."vouchers" from "authenticated";

revoke references on table "public"."vouchers" from "authenticated";

revoke select on table "public"."vouchers" from "authenticated";

revoke trigger on table "public"."vouchers" from "authenticated";

revoke truncate on table "public"."vouchers" from "authenticated";

revoke update on table "public"."vouchers" from "authenticated";

revoke delete on table "public"."vouchers" from "service_role";

revoke insert on table "public"."vouchers" from "service_role";

revoke references on table "public"."vouchers" from "service_role";

revoke select on table "public"."vouchers" from "service_role";

revoke trigger on table "public"."vouchers" from "service_role";

revoke truncate on table "public"."vouchers" from "service_role";

revoke update on table "public"."vouchers" from "service_role";

alter table "public"."vouchers" drop constraint "vouchers_code_key";

alter table "public"."vouchers" drop constraint "vouchers_user_id_fkey";

drop function if exists "public"."set_voucher_code"();

alter table "public"."vouchers" drop constraint "vouchers_pkey";

drop index if exists "public"."vouchers_code_key";

drop index if exists "public"."vouchers_pkey";

drop table "public"."vouchers";

alter table "public"."points" alter column "id" drop default;

alter table "public"."points" disable row level security;

alter table "public"."product_vouchers" add column "expiring_at" timestamp with time zone default (now() + '30 days'::interval);

alter table "public"."product_vouchers" add column "status" currency_status default 'active'::currency_status;

alter table "public"."product_vouchers" alter column "code" drop not null;

alter table "public"."product_vouchers" alter column "user_id" set default auth.uid();

alter table "public"."product_vouchers" disable row level security;

alter table "public"."reward_vouchers" drop column "expiry_date";

alter table "public"."reward_vouchers" add column "expiring_at" timestamp with time zone not null default (now() + '30 days'::interval);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.redeem_product_voucher()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  required_credits INT;
  available_credits INT;
  remaining INT;
  r RECORD;
BEGIN
  -- 1. Get the required credits for the product reward
  SELECT price INTO required_credits
  FROM products
  WHERE id = NEW.product_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found for ID %', NEW.product_id;
  END IF;

  -- 2. Count how many active credit rows the user has
  SELECT COUNT(*) INTO available_credits
  FROM public.credits
  WHERE user_id = NEW.user_id AND status = 'active';

  RAISE NOTICE 'Checking credits: required %, available %', required_credits, available_credits;

  -- 3. Validate if the user has enough
  IF available_credits < required_credits THEN
    RAISE EXCEPTION 'User does not have enough credits. Required: %, Available: %',
      required_credits, available_credits;
  END IF;

  -- 4. Mark the oldest credits as used
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
END;$function$
;

CREATE OR REPLACE FUNCTION public.set_product_voucher_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  try_code TEXT;
BEGIN
  IF NEW.code IS NOT NULL THEN
    RETURN NEW;
  END IF;

  LOOP
    try_code := generate_voucher_code();
    IF NOT EXISTS (SELECT 1 FROM product_vouchers WHERE code = try_code) THEN
      NEW.code := try_code;
      EXIT;
    END IF;
  END LOOP;

  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.set_reward_voucher_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  try_code TEXT;
BEGIN
  IF NEW.code IS NOT NULL THEN
    RETURN NEW;
  END IF;

  LOOP
    try_code := generate_voucher_code();
    IF NOT EXISTS (SELECT 1 FROM reward_vouchers WHERE code = try_code) THEN
      NEW.code := try_code;
      EXIT;
    END IF;
  END LOOP;

  RETURN NEW;
END;$function$
;

create policy "Clients can view their credits"
on "public"."credits"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));


CREATE TRIGGER redeem_product_voucher BEFORE INSERT ON public.product_vouchers FOR EACH ROW EXECUTE FUNCTION redeem_product_voucher();

CREATE TRIGGER set_product_voucher_code BEFORE INSERT ON public.product_vouchers FOR EACH ROW EXECUTE FUNCTION set_product_voucher_code();

CREATE TRIGGER set_reward_voucher_code AFTER INSERT ON public.reward_vouchers FOR EACH ROW EXECUTE FUNCTION set_reward_voucher_code();


