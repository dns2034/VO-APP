CREATE UNIQUE INDEX products_sku_unique ON public.products USING btree (name);

alter table "public"."products" add constraint "products_sku_unique" UNIQUE using index "products_sku_unique";


