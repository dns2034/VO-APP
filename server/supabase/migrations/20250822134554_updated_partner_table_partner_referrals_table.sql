alter table "public"."partner_referrals" drop column "referred_ by";

alter table "public"."partner_referrals" add column "partner_id" bigint;

alter table "public"."partners" drop column "partner_id";

alter table "public"."partners" add column "email" text;

alter table "public"."partners" alter column "id" drop default;

alter table "public"."partners" alter column "id" set data type bigint using "id"::bigint;

alter table "public"."partner_referrals" add constraint "partner_referrals_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) not valid;

alter table "public"."partner_referrals" validate constraint "partner_referrals_partner_id_fkey";


