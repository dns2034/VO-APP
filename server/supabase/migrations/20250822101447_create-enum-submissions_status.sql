create type "public"."submissions_status" as enum ('passed', 'failed');

alter table "public"."dead_letters" alter column "status" set default 'failed'::submissions_status;

alter table "public"."dead_letters" alter column "status" set not null;

alter table "public"."dead_letters" alter column "status" set data type submissions_status using "status"::submissions_status;

alter table "public"."submissions_audit" alter column "status" set default 'passed'::submissions_status;

alter table "public"."submissions_audit" alter column "status" set not null;

alter table "public"."submissions_audit" alter column "status" set data type submissions_status using "status"::submissions_status;


