SELECT cron.schedule(
  'expire_points_job',
  '0 0 * * *',               -- every day at midnight
  $$
  UPDATE public.points
  SET status = 'expired'
  WHERE status != 'expired'
    AND expires_at <= NOW();
  $$
);
