alter table "public"."partner_referrals" drop column "referred_ by";

alter table "public"."partner_referrals" add column "partner_id" bigint;

-- Drop the existing partners table
DROP TABLE IF EXISTS public.partners CASCADE;

-- Recreate partners table
CREATE TABLE public.partners (
  id BIGINT NOT NULL,
  name TEXT NULL,
  email TEXT NULL,
  partner_type public.partner_type NOT NULL,
  CONSTRAINT partners_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

alter table "public"."partner_referrals" add constraint "partner_referrals_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) not valid;

alter table "public"."partner_referrals" validate constraint "partner_referrals_partner_id_fkey";


