select cron.schedule(
  'check-expired-vouchers',   -- name
  '0 0 * * *',                -- every midnight
  $$ update product_vouchers set status = 'expired' where expiring_at < now(); $$
);
