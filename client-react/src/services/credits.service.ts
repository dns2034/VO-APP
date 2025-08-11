import supabase from "@/config/supabase-client";

export const getAllCredits = async () => {
  const { data, error } = await supabase
    .from("credits")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getCreditById = async (id: string) => {
  const { data, error } = await supabase
    .from("credits")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};
