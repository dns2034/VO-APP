CREATE TRIGGER trigger_submit_booking BEFORE INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION submit_booking();


