import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type SpaceInsert = Database["public"]["Tables"]["spaces"]["Insert"];
type SpaceUpdate = Database["public"]["Tables"]["spaces"]["Update"];

export const spacesService = {
  getAll: async () => {
    const { data, error } = await supabase.from("spaces").select("*");

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (space: SpaceInsert) => {
    const { data, error } = await supabase
      .from("spaces")
      .insert(space)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, space: SpaceUpdate) => {
    const { data, error } = await supabase
      .from("spaces")
      .update(space)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("spaces").delete().eq("id", id);

    if (error) throw error;
  },

  getByBranchId: async ({ branchId }: { branchId: string }) => {
    const { data, error } = await supabase
      .from("spaces")
      .select("*")
      .eq("branch_id", branchId);

    if (error) throw error;
    return data;
  },
};
