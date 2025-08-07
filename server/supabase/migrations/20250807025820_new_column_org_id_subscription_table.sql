alter table "public"."subscriptions" add column "organization_id" uuid not null;

alter table "public"."subscriptions" add constraint "subscriptions_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_organization_id_fkey";


