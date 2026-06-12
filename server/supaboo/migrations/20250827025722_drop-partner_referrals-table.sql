drop policy "client_select_own_referrals" on "public"."partner_referrals";

drop policy "manager_manage_referrals" on "public"."partner_referrals";

revoke delete on table "public"."partner_referrals" from "anon";

revoke insert on table "public"."partner_referrals" from "anon";

revoke references on table "public"."partner_referrals" from "anon";

revoke select on table "public"."partner_referrals" from "anon";

revoke trigger on table "public"."partner_referrals" from "anon";

revoke truncate on table "public"."partner_referrals" from "anon";

revoke update on table "public"."partner_referrals" from "anon";

revoke delete on table "public"."partner_referrals" from "authenticated";

revoke insert on table "public"."partner_referrals" from "authenticated";

revoke references on table "public"."partner_referrals" from "authenticated";

revoke select on table "public"."partner_referrals" from "authenticated";

revoke trigger on table "public"."partner_referrals" from "authenticated";

revoke truncate on table "public"."partner_referrals" from "authenticated";

revoke update on table "public"."partner_referrals" from "authenticated";

revoke delete on table "public"."partner_referrals" from "service_role";

revoke insert on table "public"."partner_referrals" from "service_role";

revoke references on table "public"."partner_referrals" from "service_role";

revoke select on table "public"."partner_referrals" from "service_role";

revoke trigger on table "public"."partner_referrals" from "service_role";

revoke truncate on table "public"."partner_referrals" from "service_role";

revoke update on table "public"."partner_referrals" from "service_role";

alter table "public"."partner_referrals" drop constraint "partner_referrals_partner_id_fkey";

alter table "public"."partner_referrals" drop constraint "partner_referrals_pkey";

drop index if exists "public"."partner_referrals_pkey";

drop table "public"."partner_referrals";


