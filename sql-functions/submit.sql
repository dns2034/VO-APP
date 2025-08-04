INSERT INTO bookings (
  booked_by,
  start_time,
  end_time,
  date,
  status,
  remarks,
  product_voucher_id,
  space_unit_id
)
VALUES (
  'e2039206-f313-49c3-bc16-0596c11e4a5d',                -- booked_by (must match an existing user with a valid voucher)
  '10:00:00+08',                   -- start_time
  '11:00:00+08',                   -- end_time (must be within allowed duration if using meeting room voucher)
  '2025-08-01',                    -- date
  'booked',                        -- status (must match booking_status enum)
  'Team meeting with client',      -- remarks
  '00417f6f-61a4-45be-8b75-b7a70253e9c5', -- product_voucher
  '32153000-e752-4cca-afb7-d6f000530667'           -- space_unit_id (must match existing space unit)
);
