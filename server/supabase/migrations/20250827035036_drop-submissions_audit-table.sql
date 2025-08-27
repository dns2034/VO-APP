drop policy "Managers can view submissions audit" on "public"."submissions_audit";

revoke delete on table "public"."submissions_audit" from "anon";

revoke insert on table "public"."submissions_audit" from "anon";

revoke references on table "public"."submissions_audit" from "anon";

revoke select on table "public"."submissions_audit" from "anon";

revoke trigger on table "public"."submissions_audit" from "anon";

revoke truncate on table "public"."submissions_audit" from "anon";

revoke update on table "public"."submissions_audit" from "anon";

revoke delete on table "public"."submissions_audit" from "authenticated";

revoke insert on table "public"."submissions_audit" from "authenticated";

revoke references on table "public"."submissions_audit" from "authenticated";

revoke select on table "public"."submissions_audit" from "authenticated";

revoke trigger on table "public"."submissions_audit" from "authenticated";

revoke truncate on table "public"."submissions_audit" from "authenticated";

revoke update on table "public"."submissions_audit" from "authenticated";

revoke delete on table "public"."submissions_audit" from "service_role";

revoke insert on table "public"."submissions_audit" from "service_role";

revoke references on table "public"."submissions_audit" from "service_role";

revoke select on table "public"."submissions_audit" from "service_role";

revoke trigger on table "public"."submissions_audit" from "service_role";

revoke truncate on table "public"."submissions_audit" from "service_role";

revoke update on table "public"."submissions_audit" from "service_role";

alter table "public"."submissions_audit" drop constraint "submissions_audit_partner_id_key";

alter table "public"."submissions_audit" drop constraint "submissions_audit_pkey";

drop index if exists "public"."submissions_audit_partner_id_key";

drop index if exists "public"."submissions_audit_pkey";

drop table "public"."submissions_audit";


