drop trigger if exists "trg_create_credit_on_referral" on "public"."referrals";

drop policy "Clients can make referrals" on "public"."referrals";

drop policy "Clients can view their referrals" on "public"."referrals";

drop policy "Managers can delete referrals under their branch and organizati" on "public"."referrals";

drop policy "Managers can update referrals under their branch and organizati" on "public"."referrals";

drop policy "Managers can view referrals under their branch and  organizatio" on "public"."referrals";

alter table "public"."referrals" drop constraint "referrals_referred_by_fkey";

alter table "public"."referrals" drop column "metadata";

alter table "public"."referrals" add column "lead_email" text not null;

alter table "public"."referrals" add column "source" jsonb;

alter table "public"."referrals" alter column "referred_by" set not null;

alter table "public"."referrals" disable row level security;

alter table "public"."referrals" add constraint "referrals_referred_by_fkey" FOREIGN KEY (referred_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."referrals" validate constraint "referrals_referred_by_fkey";


