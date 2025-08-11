import supabase from "@/config/supabase-client";

export const getAllPoints = async () => {
  const { data, error } = await supabase
    .from("points")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getPointById = async (id: string) => {
  const { data, error } = await supabase
    .from("points")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};
