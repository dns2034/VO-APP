set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.purge_old_se_logs(retention_days integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare
  deleted_count int := 0;
begin
  delete from public.event_logs
  where created_at < now() - (retention_days || ' days')::interval;

  get diagnostics deleted_count = row_count;

  return deleted_count;
end;
$function$
;

create or replace view "public"."se_fan_totals" as  SELECT referred_by AS participant_id,
    count(id) AS total_referrals
   FROM referrals r
  GROUP BY referred_by;


create or replace view "public"."voucher_aggregates" as  WITH all_vouchers AS (
         SELECT cash_vouchers.id,
            'cash'::text AS type,
            cash_vouchers.status,
            cash_vouchers.expires_at AS expiring_at,
            cash_vouchers.created_at,
            cash_vouchers.voucher_tx_msg_id
           FROM cash_vouchers
        UNION ALL
         SELECT product_vouchers.id,
            'product'::text AS type,
            (product_vouchers.status)::text AS status,
            product_vouchers.expiring_at,
            product_vouchers.created_at,
            product_vouchers.voucher_tx_msg_id
           FROM product_vouchers
        )
 SELECT count(*) AS total_vouchers,
    count(*) FILTER (WHERE (status = 'redeemed'::text)) AS redeemed_vouchers,
    count(*) FILTER (WHERE (status <> 'redeemed'::text)) AS outstanding_vouchers,
    count(*) FILTER (WHERE ((expiring_at < now()) AND (status <> 'redeemed'::text))) AS expired_unredeemed_vouchers
   FROM all_vouchers;



