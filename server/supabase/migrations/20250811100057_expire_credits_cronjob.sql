SELECT cron.schedule(
  'expire_credits_job',
  '0 0 * * *',  -- every day at midnight
  $$
  UPDATE credits
  SET status = 'expired'
  WHERE expiration_date < NOW()
    AND status != 'expired';
  $$
);
