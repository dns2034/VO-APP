import { useState, useEffect } from "react";
import { BookingsService } from "@/services/bookings.service";
import { Database } from "@/types/supabase";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

export function useBookings() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await BookingsService.getAll();
        setBookings(data);
      } catch (error) {
        //console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, error };
}
