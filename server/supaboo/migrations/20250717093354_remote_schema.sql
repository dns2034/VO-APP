create type "public"."voucher_status" as enum ('used', 'active', 'expired');

alter table "public"."credits" drop constraint "credits_user_id_key";

drop index if exists "public"."credits_user_id_key";

alter table "public"."credits" drop column "balance";

alter table "public"."credits" add column "amount" integer not null;

alter table "public"."points" drop column "balance";

alter table "public"."points" add column "amount" integer not null default 0;

alter table "public"."points" add column "source" text;

alter table "public"."reward_vouchers" add column "status" voucher_status not null default 'active'::voucher_status;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_voucher_code()
 RETURNS text
 LANGUAGE plpgsql
AS $function$BEGIN
  RETURN upper(SUBSTRING(md5(random()::text), 1, 8));
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_user_active_credits(user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  total_credits INTEGER;
BEGIN
  SELECT COALESCE(SUM(amount), 0)
  INTO total_credits
  FROM credits
  WHERE credits.user_id = user_id
    AND status = 'active';

  RETURN total_credits;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_voucher_code_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.code IS NULL THEN
    NEW.code := generate_voucher_code();
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.validate_credits()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  available_credits INTEGER;
  product_price INTEGER;
BEGIN
  -- Get product price
  SELECT price INTO product_price
  FROM products
  WHERE id = NEW.product_id;

  IF product_price IS NULL THEN
    RAISE EXCEPTION 'Product not found.';
  END IF;

  available_credits := get_user_active_credits(NEW.user_id);

  IF available_credits < product_price THEN
    RAISE EXCEPTION 'Not enough credits. Required: %, Available: %', product_price, available_credits;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE TRIGGER set_voucher_code BEFORE INSERT ON public.vouchers FOR EACH ROW EXECUTE FUNCTION set_voucher_code_trigger();


