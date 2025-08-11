// credits.service.ts
import supabase from "@/config/supabase-client";

export const creditsService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("credits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("credits")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};
