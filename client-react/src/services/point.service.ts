import supabase from "@/config/supabase-client";

export const pointsService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("points")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("points")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};
