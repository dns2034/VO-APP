alter table "public"."user_subscriptions" drop constraint "user_subscriptions_user_id_key";

drop index if exists "public"."user_subscriptions_user_id_key";

alter table "public"."user_subscriptions" alter column "user_id" drop default;

alter table "public"."user_subscriptions" alter column "user_id" drop not null;


