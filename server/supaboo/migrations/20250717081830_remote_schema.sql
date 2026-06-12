alter table "public"."products" add column "organization_id" uuid not null;

alter table "public"."products" disable row level security;

alter table "public"."reward_vouchers" add column "expiry_date" date not null;

alter table "public"."rewards" disable row level security;

alter table "public"."products" add constraint "products_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."products" validate constraint "products_organization_id_fkey";


