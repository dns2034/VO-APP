drop policy "Enable user to select their landing_page" on "public"."user_landing_page";

revoke delete on table "public"."user_landing_page" from "anon";

revoke insert on table "public"."user_landing_page" from "anon";

revoke references on table "public"."user_landing_page" from "anon";

revoke select on table "public"."user_landing_page" from "anon";

revoke trigger on table "public"."user_landing_page" from "anon";

revoke truncate on table "public"."user_landing_page" from "anon";

revoke update on table "public"."user_landing_page" from "anon";

revoke delete on table "public"."user_landing_page" from "authenticated";

revoke insert on table "public"."user_landing_page" from "authenticated";

revoke references on table "public"."user_landing_page" from "authenticated";

revoke select on table "public"."user_landing_page" from "authenticated";

revoke trigger on table "public"."user_landing_page" from "authenticated";

revoke truncate on table "public"."user_landing_page" from "authenticated";

revoke update on table "public"."user_landing_page" from "authenticated";

revoke delete on table "public"."user_landing_page" from "service_role";

revoke insert on table "public"."user_landing_page" from "service_role";

revoke references on table "public"."user_landing_page" from "service_role";

revoke select on table "public"."user_landing_page" from "service_role";

revoke trigger on table "public"."user_landing_page" from "service_role";

revoke truncate on table "public"."user_landing_page" from "service_role";

revoke update on table "public"."user_landing_page" from "service_role";

alter table "public"."user_landing_page" drop constraint "user_landing_page_user_id_fkey";

alter table "public"."user_landing_page" drop constraint "user_landing_page_pkey";

drop index if exists "public"."user_landing_page_pkey";

drop table "public"."user_landing_page";

create table "public"."user_landing_pages" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "url" text not null
);


alter table "public"."user_landing_pages" enable row level security;

CREATE UNIQUE INDEX user_landing_page_pkey ON public.user_landing_pages USING btree (id);

alter table "public"."user_landing_pages" add constraint "user_landing_page_pkey" PRIMARY KEY using index "user_landing_page_pkey";

alter table "public"."user_landing_pages" add constraint "user_landing_page_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_landing_pages" validate constraint "user_landing_page_user_id_fkey";

grant delete on table "public"."user_landing_pages" to "anon";

grant insert on table "public"."user_landing_pages" to "anon";

grant references on table "public"."user_landing_pages" to "anon";

grant select on table "public"."user_landing_pages" to "anon";

grant trigger on table "public"."user_landing_pages" to "anon";

grant truncate on table "public"."user_landing_pages" to "anon";

grant update on table "public"."user_landing_pages" to "anon";

grant delete on table "public"."user_landing_pages" to "authenticated";

grant insert on table "public"."user_landing_pages" to "authenticated";

grant references on table "public"."user_landing_pages" to "authenticated";

grant select on table "public"."user_landing_pages" to "authenticated";

grant trigger on table "public"."user_landing_pages" to "authenticated";

grant truncate on table "public"."user_landing_pages" to "authenticated";

grant update on table "public"."user_landing_pages" to "authenticated";

grant delete on table "public"."user_landing_pages" to "service_role";

grant insert on table "public"."user_landing_pages" to "service_role";

grant references on table "public"."user_landing_pages" to "service_role";

grant select on table "public"."user_landing_pages" to "service_role";

grant trigger on table "public"."user_landing_pages" to "service_role";

grant truncate on table "public"."user_landing_pages" to "service_role";

grant update on table "public"."user_landing_pages" to "service_role";

create policy "Enable user to select their landing_page"
on "public"."user_landing_pages"
as permissive
for select
to authenticated
using ((user_id = auth.uid()));



