alter table "public"."referrals" add column "lead_email" text;

CREATE UNIQUE INDEX referrals_referred_by_lead_email_uidx ON public.referrals USING btree (referred_by, lead_email);


