import { supabaseClient } from "./supabase/client";
import { Database } from "@/types/supabase";

type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];
type BusinessInsert = Database["public"]["Tables"]["businesses"]["Insert"];
type BusinessUpdate = Database["public"]["Tables"]["businesses"]["Update"];

const BusinessesService = {
  async getAll(): Promise<BusinessRow[]> {
    const { data, error } = await supabaseClient
      .from("businesses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as BusinessRow[];
  },

  async getById(id: string): Promise<BusinessRow | null> {
    const { data, error } = await supabaseClient
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(business: BusinessInsert): Promise<BusinessRow> {
    const { data, error } = await supabaseClient
      .from("businesses")
      .insert(business)
      .single();

    if (error) throw error;
    return data as BusinessRow;
  },

  async update(id: string, updates: BusinessUpdate): Promise<BusinessRow> {
    const { data, error } = await supabaseClient
      .from("businesses")
      .update(updates)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as BusinessRow;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from("businesses")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};

export default BusinessesService;
