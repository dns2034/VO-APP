drop policy "Clients can view amenities in their organization" on "public"."amenities";

revoke delete on table "public"."amenities" from "anon";

revoke insert on table "public"."amenities" from "anon";

revoke references on table "public"."amenities" from "anon";

revoke select on table "public"."amenities" from "anon";

revoke trigger on table "public"."amenities" from "anon";

revoke truncate on table "public"."amenities" from "anon";

revoke update on table "public"."amenities" from "anon";

revoke delete on table "public"."amenities" from "authenticated";

revoke insert on table "public"."amenities" from "authenticated";

revoke references on table "public"."amenities" from "authenticated";

revoke select on table "public"."amenities" from "authenticated";

revoke trigger on table "public"."amenities" from "authenticated";

revoke truncate on table "public"."amenities" from "authenticated";

revoke update on table "public"."amenities" from "authenticated";

revoke delete on table "public"."amenities" from "service_role";

revoke insert on table "public"."amenities" from "service_role";

revoke references on table "public"."amenities" from "service_role";

revoke select on table "public"."amenities" from "service_role";

revoke trigger on table "public"."amenities" from "service_role";

revoke truncate on table "public"."amenities" from "service_role";

revoke update on table "public"."amenities" from "service_role";

alter table "public"."amenities" drop constraint "amenities_branch_id_fkey";

drop function if exists "public"."add_amenity_manager"(p_branch_id uuid, p_name text, p_amenity_url text, p_is_available boolean);

drop function if exists "public"."delete_amenity_manager"(p_amenity_id bigint);

drop function if exists "public"."set_amenity_availability"(p_amenity_id bigint, p_is_available boolean);

drop function if exists "public"."update_amenity_manager"(p_amenity_id bigint, p_name text, p_amenity_url text, p_is_available boolean);

alter table "public"."amenities" drop constraint "amenities_pkey";

drop index if exists "public"."amenities_pkey";

drop table "public"."amenities";


