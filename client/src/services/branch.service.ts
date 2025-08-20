import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type BranchInsert = Database["public"]["Tables"]["branches"]["Insert"];
type BranchUpdate = Database["public"]["Tables"]["branches"]["Update"];

export const branchesService = {
  getAll: async () => {
    const { data, error } = await supabase.from("branches").select("*");

    if (error) throw new Error(`Failed to fetch branches: ${error.message}`);
    return data || [];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to fetch branch: ${error.message}`);

    return data;
  },

  create: async (branch: BranchInsert) => {
    const { data, error } = await supabase
      .from("branches")
      .insert(branch)
      .single();

    if (error) throw new Error(`Failed to create branch: ${error.message}`);
    return data;
  },

  update: async (id: string, branch: BranchUpdate) => {
    const { data, error } = await supabase
      .from("branches")
      .update(branch)
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to update branch: ${error.message}`);
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("branches").delete().eq("id", id);

    if (error) throw new Error(`Failed to delete branch: ${error.message}`);
  },
};
