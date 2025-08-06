import { supabaseClient } from "./supabase/client";
import { Database } from "@/types/supabase";

type CreditRow = Database["public"]["Tables"]["credits"]["Row"];

const CreditsService = {
  async getAll(): Promise<CreditRow[]> {
    const { data, error } = await supabaseClient
      .from("credits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as CreditRow[];
  },

  async getById(id: string): Promise<CreditRow | null> {
    const { data, error } = await supabaseClient
      .from("credits")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};

export default CreditsService;
