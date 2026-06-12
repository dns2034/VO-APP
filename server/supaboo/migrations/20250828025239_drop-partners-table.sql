drop policy "Clients can select their own cash vouchers" on "public"."cash_vouchers";

drop policy "Clients can check their own partnership" on "public"."partners";

drop policy "Managers can manage partners" on "public"."partners";

revoke delete on table "public"."partners" from "anon";

revoke insert on table "public"."partners" from "anon";

revoke references on table "public"."partners" from "anon";

revoke select on table "public"."partners" from "anon";

revoke trigger on table "public"."partners" from "anon";

revoke truncate on table "public"."partners" from "anon";

revoke update on table "public"."partners" from "anon";

revoke delete on table "public"."partners" from "authenticated";

revoke insert on table "public"."partners" from "authenticated";

revoke references on table "public"."partners" from "authenticated";

revoke select on table "public"."partners" from "authenticated";

revoke trigger on table "public"."partners" from "authenticated";

revoke truncate on table "public"."partners" from "authenticated";

revoke update on table "public"."partners" from "authenticated";

revoke delete on table "public"."partners" from "service_role";

revoke insert on table "public"."partners" from "service_role";

revoke references on table "public"."partners" from "service_role";

revoke select on table "public"."partners" from "service_role";

revoke trigger on table "public"."partners" from "service_role";

revoke truncate on table "public"."partners" from "service_role";

revoke update on table "public"."partners" from "service_role";

alter table "public"."partners" drop constraint "partners_pkey";

drop index if exists "public"."partners_pkey";

drop table "public"."partners";


