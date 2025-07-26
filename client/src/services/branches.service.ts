import { Database } from "@/types/supabase";
import { supabaseClient } from "./supabase/client";

type BranchRow = Database["public"]["Tables"]["branches"]["Row"];
type BranchInsert = Database["public"]["Tables"]["branches"]["Insert"];
type BranchUpdate = Database["public"]["Tables"]["branches"]["Update"];

export class BranchesService {
  static async getAll(): Promise<BranchRow[]> {
    const { data, error } = await supabaseClient.from("branches").select("*");

    if (error) throw new Error("Failed to fetch branches: " + error.message);
    return data || [];
  }

  static async getById(id: string): Promise<BranchRow | null> {
    const { data, error } = await supabaseClient
      .from("branches")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Failed to fetch branch: " + error.message);
    return data;
  }

  static async create(branch: BranchInsert): Promise<BranchRow> {
    const { data, error } = await supabaseClient
      .from("branches")
      .insert(branch)
      .single();

    if (error) throw new Error("Failed to create branch: " + error.message);
    return data;
  }

  static async update(id: string, branch: BranchUpdate): Promise<BranchRow> {
    const { data, error } = await supabaseClient
      .from("branches")
      .update(branch)
      .eq("id", id)
      .single();

    if (error) throw new Error("Failed to update branch: " + error.message);
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from("branches")
      .delete()
      .eq("id", id);

    if (error) throw new Error("Failed to delete branch: " + error.message);
  }
}
