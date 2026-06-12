alter table "public"."bookings" alter column "end_time" drop not null;

alter table "public"."bookings" alter column "start_time" drop not null;

alter table "public"."product_vouchers" alter column "is_refundable" set default true;


