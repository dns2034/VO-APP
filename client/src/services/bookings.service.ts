import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

export class BookingsService {
  static async getAll(supabaseClient: SupabaseClient): Promise<BookingRow[]> {
    const { data, error } = await supabaseClient
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as BookingRow[];
  }
  static async getById(
    supabaseClient: SupabaseClient,
    id: string
  ): Promise<BookingRow | null> {
    const { data, error } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }
  static async create(
    supabaseClient: SupabaseClient,
    booking: BookingInsert
  ): Promise<BookingRow> {
    const { data, error } = await supabaseClient
      .from("bookings")
      .insert([booking])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
  static async update(
    supabaseClient: SupabaseClient,
    id: string,
    updates: BookingUpdate
  ): Promise<BookingRow> {
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
