drop trigger if exists "set_reward_voucher_code" on "public"."reward_vouchers";

alter table "public"."points" drop constraint "points_user_id_key";

drop index if exists "public"."points_user_id_key";

create table "public"."available_points" (
    "count" bigint
);


alter table "public"."points" alter column "id" set default gen_random_uuid();

alter table "public"."points" alter column "user_id" set default gen_random_uuid();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.redeem_product_voucher()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  required_credits int;
  available_credits int;
  remaining int;
  r record;
BEGIN
  -- 1. Get the required credits from the product
  SELECT price INTO required_credits
  FROM products
  WHERE id = NEW.product_id;

  -- 2. Count how many active credits the user has
  SELECT COUNT(*) INTO available_credits
  FROM public.points
  WHERE user_id = NEW.user_id AND status = 'active';

  -- 3. Check if user has enough
  IF available_credits < required_credits THEN
    RAISE EXCEPTION 'User does not have enough credits. Required: %, Available: %',
      required_credits, available_credits;
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
END;
$function$
;

grant delete on table "public"."available_points" to "anon";

grant insert on table "public"."available_points" to "anon";

grant references on table "public"."available_points" to "anon";

grant select on table "public"."available_points" to "anon";

grant trigger on table "public"."available_points" to "anon";

grant truncate on table "public"."available_points" to "anon";

grant update on table "public"."available_points" to "anon";

grant delete on table "public"."available_points" to "authenticated";

grant insert on table "public"."available_points" to "authenticated";

grant references on table "public"."available_points" to "authenticated";

grant select on table "public"."available_points" to "authenticated";

grant trigger on table "public"."available_points" to "authenticated";

grant truncate on table "public"."available_points" to "authenticated";

grant update on table "public"."available_points" to "authenticated";

grant delete on table "public"."available_points" to "service_role";

grant insert on table "public"."available_points" to "service_role";

grant references on table "public"."available_points" to "service_role";

grant select on table "public"."available_points" to "service_role";

grant trigger on table "public"."available_points" to "service_role";

grant truncate on table "public"."available_points" to "service_role";

grant update on table "public"."available_points" to "service_role";

CREATE TRIGGER set_reward_voucher_code BEFORE INSERT ON public.reward_vouchers FOR EACH ROW EXECUTE FUNCTION redeem_reward_voucher();


