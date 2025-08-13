// credits.service.ts
import supabaseClient from "@/lib/supabase-client";

export const creditsService = {
  getUserCredits: async (userId: string) => {
    const { data, error } = await supabaseClient.rpc(
      "get_total_active_credits",
      {
        p_user_id: userId,
      }
    );

    if (error) throw error;
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabaseClient
      .from("credits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabaseClient
      .from("credits")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};
