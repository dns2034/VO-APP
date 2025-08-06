import { supabaseClient } from "./supabase/client";
import { Database } from "@/types/supabase";

type PointRow = Database["public"]["Tables"]["points"]["Row"];

const PointsService = {
  async getAll(): Promise<PointRow[]> {
    const { data, error } = await supabaseClient
      .from("points")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as PointRow[];
  },

  async getById(id: string): Promise<PointRow | null> {
    const { data, error } = await supabaseClient
      .from("points")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};

export default PointsService;
