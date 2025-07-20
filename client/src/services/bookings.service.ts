import { Database } from "@/types/supabase";
import { supabaseClient } from "@/services/supabase/client";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

export class BookingsService {
  static async getAll(): Promise<BookingRow[]> {
    const { data, error } = await supabaseClient
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as BookingRow[];
  }
  static async getById(id: string): Promise<BookingRow | null> {
    const { data, error } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }
  static async create(booking: BookingInsert): Promise<BookingRow> {
    const { data, error } = await supabaseClient
      .from("bookings")
      .insert([booking])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
  static async update(id: string, updates: BookingUpdate): Promise<BookingRow> {
    const { data, error } = await supabaseClient
      .from("bookings")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
