alter table "public"."branches" drop column "pin_location";

alter table "public"."space_units" drop column "remark";

alter table "public"."space_units" drop column "status";

alter table "public"."spaces" drop column "descriptions";

create or replace view "public"."available_products" as  SELECT p.id,
    p.name,
    p.description,
    p.image_path,
    p.price,
    p.duration,
    p.space_id,
    s.name AS space_name
   FROM (products p
     JOIN spaces s ON ((s.id = p.space_id)));


create or replace view "public"."available_spaces" as  SELECT id,
    name,
    created_at,
    branch_id
   FROM spaces s;



