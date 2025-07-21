import { useState, useEffect, useCallback } from "react";
import { BookingsService } from "@/services/bookings.service";
import { Database } from "@/types/supabase";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

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

  const createBooking = async (booking: BookingInsert) => {
    try {
      const newBooking = await BookingsService.create(booking);
      setBookings((prev) => [newBooking, ...prev]);
      return newBooking;
    } catch (error) {
      throw new Error("Failed to create booking: " + (error as Error).message);
    }
  };

  const updateBooking = async (id: string, updates: BookingUpdate) => {
    try {
      const updatedBooking = await BookingsService.update(id, updates);
      setBookings((prev) =>
        prev.map((booking) => (booking.id === id ? updatedBooking : booking))
      );
      return updatedBooking;
    } catch (error) {
      throw new Error("Failed to update booking: " + (error as Error).message);
    }
  };

  return {
    bookings,
    loading,
    error,
    cancelBooking,
    fetchBookings,
    createBooking,
    updateBooking,
  };
}
