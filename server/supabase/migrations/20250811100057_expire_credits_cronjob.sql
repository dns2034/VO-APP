-- Ensure pg_cron is installed before scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the expire_credits cron job (every 1 minute for testing)
SELECT cron.schedule(
  'expire_credits_job',
  '* * * * *',  -- every 1 minute for testing; change to '0 0 * * *' for midnight
  $$
  UPDATE credits
  SET status = 'expired'
  WHERE expires_at < NOW()
    AND status != 'expired';
  $$
);