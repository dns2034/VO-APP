-- Ensure pg_cron is installed before scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the expire_credits cron job
SELECT cron.schedule(
  'expire_credits_job',
  '0 0 * * *',  -- every midnight
  $$
  UPDATE credits
  SET status = 'expired'
  WHERE expires_at < NOW()
    AND status != 'expired';
  $$
);