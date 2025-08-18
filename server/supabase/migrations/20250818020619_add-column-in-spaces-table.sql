alter table "public"."amenities" add column "name" text not null;

alter table "public"."spaces" add column "capacity" smallint not null default '1'::smallint;


