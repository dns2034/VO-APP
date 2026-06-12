alter table "public"."spaces" drop constraint "spaces_name_key";

drop index if exists "public"."spaces_name_key";

alter table "public"."bookings" alter column "status" drop default;

alter type "public"."booking_status" rename to "booking_status__old_version_to_be_dropped";

create type "public"."booking_status" as enum ('booked', 'cancelled', 'pending', 'completed', 'no-show');

alter table "public"."bookings" alter column status type "public"."booking_status" using status::text::"public"."booking_status";

alter table "public"."bookings" alter column "status" set default 'booked'::booking_status;

drop type "public"."booking_status__old_version_to_be_dropped";

alter table "public"."branches" add column "image_path" text;

alter table "public"."branches" add column "location" text;


