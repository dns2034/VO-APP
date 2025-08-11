alter table "public"."referrals" drop constraint "referrals_user_id_fkey";

alter table "public"."referrals" drop column "user_id";

alter table "public"."referrals" add constraint "referrals_referred_by_fkey" FOREIGN KEY (referred_by) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."referrals" validate constraint "referrals_referred_by_fkey";


