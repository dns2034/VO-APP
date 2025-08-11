import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type BusinessInsert = Database["public"]["Tables"]["businesses"]["Insert"];
type BusinessUpdate = Database["public"]["Tables"]["businesses"]["Update"];

export const businessesService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (business: BusinessInsert) => {
    const { data, error } = await supabase
      .from("businesses")
      .insert(business)
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: BusinessUpdate) => {
    const { data, error } = await supabase
      .from("businesses")
      .update(updates)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("businesses").delete().eq("id", id);

    if (error) throw error;
  },
};