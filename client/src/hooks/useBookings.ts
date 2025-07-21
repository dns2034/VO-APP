import { useState, useEffect, useCallback } from "react";
import { BookingsService } from "@/services/bookings.service";
import { Database } from "@/types/supabase";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

export function useBookings() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await BookingsService.getAll();
      setBookings(data);
    } catch (error) {
      setError("Failed to fetch bookings: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const cancelBooking = async (id: string) => {
    try {
      await BookingsService.update(id, { status: "cancelled" });
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (error) {
      throw new Error("Failed to cancel booking: " + (error as Error).message);
    }
  };

  return {
    bookings,
    loading,
    error,
    cancelBooking,
    fetchBookings,
  };
}
