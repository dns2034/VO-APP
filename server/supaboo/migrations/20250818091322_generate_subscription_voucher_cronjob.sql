-- Run every day at midnight
SELECT cron.schedule(
  'daily_subscription_vouchers',   -- unique job name
  '0 0 * * *',                     -- cron syntax: minute hour day month day-of-week
  $$SELECT public.generate_all_subscription_vouchers();$$
);
