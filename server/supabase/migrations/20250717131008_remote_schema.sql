create type "public"."currency_status" as enum ('active', 'used', 'expired');

drop trigger if exists "set_voucher_code" on "public"."vouchers";

alter table "public"."reward_vouchers" drop constraint "reward_vouchers_product_id_fkey";

drop function if exists "public"."get_user_active_credits"(user_id uuid);

drop function if exists "public"."set_voucher_code_trigger"();

drop function if exists "public"."validate_credits"();

alter table "public"."credits" drop column "amount";

alter table "public"."credits" add column "expires_at" timestamp with time zone not null default (now() + '30 days'::interval);

alter table "public"."credits" add column "status" currency_status not null default 'active'::currency_status;

alter table "public"."points" drop column "amount";

alter table "public"."points" drop column "source";

alter table "public"."points" add column "expires_at" timestamp with time zone not null default (now() + '30 days'::interval);

alter table "public"."points" add column "status" currency_status not null default 'active'::currency_status;

alter table "public"."points" alter column "id" set default gen_random_uuid();

alter table "public"."points" alter column "id" drop identity;

alter table "public"."points" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."profiles" add column "organization_id" uuid not null;

alter table "public"."reward_vouchers" drop column "product_id";

alter table "public"."reward_vouchers" add column "reward_id" uuid not null;

CREATE UNIQUE INDEX vouchers_code_key ON public.vouchers USING btree (code);

alter table "public"."profiles" add constraint "profiles_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."profiles" validate constraint "profiles_organization_id_fkey";

alter table "public"."reward_vouchers" add constraint "reward_vouchers_reward_id_fkey" FOREIGN KEY (reward_id) REFERENCES rewards(id) not valid;

alter table "public"."reward_vouchers" validate constraint "reward_vouchers_reward_id_fkey";

alter table "public"."vouchers" add constraint "vouchers_code_key" UNIQUE using index "vouchers_code_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.redeem_reward_voucher()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  required_points int;
  available_points int;
  remaining int;
  r record;
BEGIN
  -- 1. Get the required points from the reward
  SELECT price INTO required_points
  FROM rewards
  WHERE id = NEW.reward_id;

  -- 2. Count how many active points the user has
  SELECT COUNT(*) INTO available_points
  FROM public.points
  WHERE user_id = NEW.user_id AND status = 'active';

  -- 3. Check if user has enough
  IF available_points < required_points THEN
    RAISE EXCEPTION 'User does not have enough points. Required: %, Available: %',
      required_points, available_points;
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
END;$function$
;

CREATE OR REPLACE FUNCTION public.set_voucher_code()
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
    IF NOT EXISTS (SELECT 1 FROM vouchers WHERE code = try_code) THEN
      NEW.code := try_code;
      EXIT;
    END IF;
  END LOOP;

  RETURN NEW;
END;$function$
;

CREATE TRIGGER redeem_reward_voucher BEFORE INSERT ON public.reward_vouchers FOR EACH ROW EXECUTE FUNCTION redeem_reward_voucher();

CREATE TRIGGER set_voucher_code BEFORE INSERT ON public.vouchers FOR EACH ROW EXECUTE FUNCTION set_voucher_code();


