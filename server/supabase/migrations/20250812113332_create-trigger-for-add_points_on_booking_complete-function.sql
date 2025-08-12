CREATE TRIGGER add_points_on_booking_complete AFTER UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION add_points_on_booking_complete();


