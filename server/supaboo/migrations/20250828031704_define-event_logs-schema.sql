create table "public"."event_logs" (
    "id" uuid not null default gen_random_uuid(),
    "event_type" text not null,
    "payload" jsonb,
    "status" text,
    "source" text,
    "created_at" timestamp with time zone default now()
);


CREATE UNIQUE INDEX event_logs_pkey ON public.event_logs USING btree (id);

CREATE INDEX idx_event_logs_created_at ON public.event_logs USING btree (created_at);

CREATE INDEX idx_event_logs_event_type ON public.event_logs USING btree (event_type);

alter table "public"."event_logs" add constraint "event_logs_pkey" PRIMARY KEY using index "event_logs_pkey";

grant delete on table "public"."event_logs" to "anon";

grant insert on table "public"."event_logs" to "anon";

grant references on table "public"."event_logs" to "anon";

grant select on table "public"."event_logs" to "anon";

grant trigger on table "public"."event_logs" to "anon";

grant truncate on table "public"."event_logs" to "anon";

grant update on table "public"."event_logs" to "anon";

grant delete on table "public"."event_logs" to "authenticated";

grant insert on table "public"."event_logs" to "authenticated";

grant references on table "public"."event_logs" to "authenticated";

grant select on table "public"."event_logs" to "authenticated";

grant trigger on table "public"."event_logs" to "authenticated";

grant truncate on table "public"."event_logs" to "authenticated";

grant update on table "public"."event_logs" to "authenticated";

grant delete on table "public"."event_logs" to "service_role";

grant insert on table "public"."event_logs" to "service_role";

grant references on table "public"."event_logs" to "service_role";

grant select on table "public"."event_logs" to "service_role";

grant trigger on table "public"."event_logs" to "service_role";

grant truncate on table "public"."event_logs" to "service_role";

grant update on table "public"."event_logs" to "service_role";


