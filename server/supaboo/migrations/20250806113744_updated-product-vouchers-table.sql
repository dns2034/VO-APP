alter table "public"."product_vouchers" add column "is_refundable" boolean not null;

alter table "public"."product_vouchers" add column "updated_at" timestamp with time zone default now();


