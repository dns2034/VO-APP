import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

export const bookingsService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
  create: async (booking: BookingInsert) => {
    const { data, error } = await supabase
      .from("bookings")
      .insert([booking])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  update: async ({ id, updates }: { id: string; updates: BookingUpdate }) => {
    const { data, error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  
  getBySpaceUnitIdAndDate: async ({
    spaceUnitId,
    date,
  }: {
    spaceUnitId: string;
    date: string;
  }) => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .match({ space_unit_id: spaceUnitId, date });

    if (error) throw error;
    return data;
  },
};
