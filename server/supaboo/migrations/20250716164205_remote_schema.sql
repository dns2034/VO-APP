create type "public"."reward_types" as enum ('credit', 'point');

alter table "public"."profiles" drop constraint "profiles_organization_id_fkey";

create table "public"."rewards" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text,
    "price" numeric not null default '0'::numeric,
    "image_path" text
);


alter table "public"."rewards" enable row level security;

create table "public"."spaces" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "is_available" boolean not null,
    "branch_id" uuid not null
);


alter table "public"."spaces" enable row level security;

alter table "public"."profiles" drop column "organization_id";

CREATE UNIQUE INDEX rewards_pkey ON public.rewards USING btree (id);

CREATE UNIQUE INDEX spaces_pkey ON public.spaces USING btree (id);

alter table "public"."rewards" add constraint "rewards_pkey" PRIMARY KEY using index "rewards_pkey";

alter table "public"."spaces" add constraint "spaces_pkey" PRIMARY KEY using index "spaces_pkey";

alter table "public"."rewards" add constraint "rewards_price_check" CHECK ((price > (0)::numeric)) not valid;

alter table "public"."rewards" validate constraint "rewards_price_check";

alter table "public"."spaces" add constraint "spaces_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."spaces" validate constraint "spaces_branch_id_fkey";

grant delete on table "public"."rewards" to "anon";

grant insert on table "public"."rewards" to "anon";

grant references on table "public"."rewards" to "anon";

grant select on table "public"."rewards" to "anon";

grant trigger on table "public"."rewards" to "anon";

grant truncate on table "public"."rewards" to "anon";

grant update on table "public"."rewards" to "anon";

grant delete on table "public"."rewards" to "authenticated";

grant insert on table "public"."rewards" to "authenticated";

grant references on table "public"."rewards" to "authenticated";

grant select on table "public"."rewards" to "authenticated";

grant trigger on table "public"."rewards" to "authenticated";

grant truncate on table "public"."rewards" to "authenticated";

grant update on table "public"."rewards" to "authenticated";

grant delete on table "public"."rewards" to "service_role";

grant insert on table "public"."rewards" to "service_role";

grant references on table "public"."rewards" to "service_role";

grant select on table "public"."rewards" to "service_role";

grant trigger on table "public"."rewards" to "service_role";

grant truncate on table "public"."rewards" to "service_role";

grant update on table "public"."rewards" to "service_role";

grant delete on table "public"."spaces" to "anon";

grant insert on table "public"."spaces" to "anon";

grant references on table "public"."spaces" to "anon";

grant select on table "public"."spaces" to "anon";

grant trigger on table "public"."spaces" to "anon";

grant truncate on table "public"."spaces" to "anon";

grant update on table "public"."spaces" to "anon";

grant delete on table "public"."spaces" to "authenticated";

grant insert on table "public"."spaces" to "authenticated";

grant references on table "public"."spaces" to "authenticated";

grant select on table "public"."spaces" to "authenticated";

grant trigger on table "public"."spaces" to "authenticated";

grant truncate on table "public"."spaces" to "authenticated";

grant update on table "public"."spaces" to "authenticated";

grant delete on table "public"."spaces" to "service_role";

grant insert on table "public"."spaces" to "service_role";

grant references on table "public"."spaces" to "service_role";

grant select on table "public"."spaces" to "service_role";

grant trigger on table "public"."spaces" to "service_role";

grant truncate on table "public"."spaces" to "service_role";

grant update on table "public"."spaces" to "service_role";


