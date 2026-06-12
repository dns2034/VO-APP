drop policy "Enable select for organization page with the same organization" on "public"."organization_pages";

revoke delete on table "public"."organization_pages" from "anon";

revoke insert on table "public"."organization_pages" from "anon";

revoke references on table "public"."organization_pages" from "anon";

revoke select on table "public"."organization_pages" from "anon";

revoke trigger on table "public"."organization_pages" from "anon";

revoke truncate on table "public"."organization_pages" from "anon";

revoke update on table "public"."organization_pages" from "anon";

revoke delete on table "public"."organization_pages" from "authenticated";

revoke insert on table "public"."organization_pages" from "authenticated";

revoke references on table "public"."organization_pages" from "authenticated";

revoke select on table "public"."organization_pages" from "authenticated";

revoke trigger on table "public"."organization_pages" from "authenticated";

revoke truncate on table "public"."organization_pages" from "authenticated";

revoke update on table "public"."organization_pages" from "authenticated";

revoke delete on table "public"."organization_pages" from "service_role";

revoke insert on table "public"."organization_pages" from "service_role";

revoke references on table "public"."organization_pages" from "service_role";

revoke select on table "public"."organization_pages" from "service_role";

revoke trigger on table "public"."organization_pages" from "service_role";

revoke truncate on table "public"."organization_pages" from "service_role";

revoke update on table "public"."organization_pages" from "service_role";

alter table "public"."organization_pages" drop constraint "organization_pages_organization_id_fkey";

alter table "public"."organization_pages" drop constraint "organization_pages_pkey";

drop index if exists "public"."organization_pages_pkey";

drop table "public"."organization_pages";

create table "public"."user_landing_page" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "url" text not null
);


alter table "public"."user_landing_page" enable row level security;

CREATE UNIQUE INDEX user_landing_page_pkey ON public.user_landing_page USING btree (id);

alter table "public"."user_landing_page" add constraint "user_landing_page_pkey" PRIMARY KEY using index "user_landing_page_pkey";

alter table "public"."user_landing_page" add constraint "user_landing_page_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_landing_page" validate constraint "user_landing_page_user_id_fkey";

grant delete on table "public"."user_landing_page" to "anon";

grant insert on table "public"."user_landing_page" to "anon";

grant references on table "public"."user_landing_page" to "anon";

grant select on table "public"."user_landing_page" to "anon";

grant trigger on table "public"."user_landing_page" to "anon";

grant truncate on table "public"."user_landing_page" to "anon";

grant update on table "public"."user_landing_page" to "anon";

grant delete on table "public"."user_landing_page" to "authenticated";

grant insert on table "public"."user_landing_page" to "authenticated";

grant references on table "public"."user_landing_page" to "authenticated";

grant select on table "public"."user_landing_page" to "authenticated";

grant trigger on table "public"."user_landing_page" to "authenticated";

grant truncate on table "public"."user_landing_page" to "authenticated";

grant update on table "public"."user_landing_page" to "authenticated";

grant delete on table "public"."user_landing_page" to "service_role";

grant insert on table "public"."user_landing_page" to "service_role";

grant references on table "public"."user_landing_page" to "service_role";

grant select on table "public"."user_landing_page" to "service_role";

grant trigger on table "public"."user_landing_page" to "service_role";

grant truncate on table "public"."user_landing_page" to "service_role";

grant update on table "public"."user_landing_page" to "service_role";

create policy "Enable user to select their landing_page"
on "public"."user_landing_page"
as permissive
for select
to public
using ((user_id = auth.uid()));



