drop policy "Subcribed users can insert their own subscription" on "public"."user_subscriptions";

drop policy "Subcribed users can update their own subscription" on "public"."user_subscriptions";

drop policy "Subcribed users can view their own subscription" on "public"."user_subscriptions";

alter table "public"."user_subscriptions" drop constraint "user_subscriptions_id_fkey";

alter table "public"."user_subscriptions" add column "user_id" uuid not null default auth.uid();

alter table "public"."user_subscriptions" alter column "expires_at" set not null;

alter table "public"."user_subscriptions" alter column "id" set default gen_random_uuid();

alter table "public"."user_subscriptions" alter column "organization_id" set not null;

alter table "public"."user_subscriptions" alter column "started_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."user_subscriptions" alter column "started_at" set not null;

alter table "public"."user_subscriptions" alter column "subscription_id" set not null;

CREATE UNIQUE INDEX user_subscriptions_organization_id_key ON public.user_subscriptions USING btree (organization_id);

CREATE UNIQUE INDEX user_subscriptions_subscription_id_key ON public.user_subscriptions USING btree (subscription_id);

CREATE UNIQUE INDEX user_subscriptions_user_id_key ON public.user_subscriptions USING btree (user_id);

alter table "public"."user_subscriptions" add constraint "user_subscriptions_organization_id_key" UNIQUE using index "user_subscriptions_organization_id_key";

alter table "public"."user_subscriptions" add constraint "user_subscriptions_subscription_id_key" UNIQUE using index "user_subscriptions_subscription_id_key";

alter table "public"."user_subscriptions" add constraint "user_subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_subscriptions" validate constraint "user_subscriptions_user_id_fkey";

alter table "public"."user_subscriptions" add constraint "user_subscriptions_user_id_key" UNIQUE using index "user_subscriptions_user_id_key";

ALTER TABLE public.user_subscriptions
ALTER COLUMN user_id DROP NOT NULL,
ALTER COLUMN user_id DROP DEFAULT;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.submit_booking()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_opening TIME WITH TIME ZONE;
  v_closing TIME WITH TIME ZONE;
BEGIN
  -- Step 0: Prevent booking past date/time
  NEW := prevent_past_booking(NEW);

  -- Step 1: Validate subscription rules & voucher (no more auto-gen here)
  NEW := handle_subscription_and_voucher(NEW);

  -- Step 2: If voucher is present, get product details
  IF NEW.product_voucher_id IS NOT NULL THEN
    SELECT * INTO v_product_id, v_product_duration
    FROM get_product_info(NEW.product_voucher_id);

    -- Step 3: Get space availability for the selected date
    SELECT * INTO v_opening, v_closing
    FROM get_space_availability(NEW.space_unit_id, NEW.date);

    -- Step 4: Assign correct booking times
    SELECT * INTO NEW.start_time, NEW.end_time
    FROM assign_booking_times_by_duration(
      NEW.start_time,
      NEW.end_time,
      v_opening,
      v_closing,
      v_product_duration
    );

    -- Step 5: Validate time boundaries
    PERFORM validate_time_within_bounds(
      NEW.start_time,
      NEW.end_time,
      v_opening,
      v_closing
    );

    -- Step 6: Check for overlapping bookings
    PERFORM check_booking_overlap(
      NEW.space_unit_id,
      NEW.date,
      NEW.start_time,
      NEW.end_time
    );

    -- Step 7: Validate and mark voucher as used
    PERFORM verify_product_voucher(
      NEW.booked_by,
      NEW.space_unit_id,
      NEW.start_time,
      NEW.end_time,
      NEW.product_voucher_id
    );

    PERFORM set_product_voucher_used(NEW.product_voucher_id);

  ELSE
    -- If voucher is NULL but allowed by subscription (future scenario),
    -- still enforce basic booking validations
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
END;
$function$
;


