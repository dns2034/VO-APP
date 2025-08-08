alter table "public"."referrals" drop constraint "referrals_referred_by_fkey";

alter table "public"."referrals" drop column "referred_by";

alter table "public"."referrals" add column "user_id" uuid;

alter table "public"."referrals" add constraint "referrals_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."referrals" validate constraint "referrals_user_id_fkey";


