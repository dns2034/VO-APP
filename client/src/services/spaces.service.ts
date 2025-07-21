import { supabaseClient } from "./supabase/client";
import { Database } from "@/types/supabase";

type SpaceRow = Database["public"]["Tables"]["spaces"]["Row"];
type SpaceInsert = Database["public"]["Tables"]["spaces"]["Insert"];
type SpaceUpdate = Database["public"]["Tables"]["spaces"]["Update"];

export const SpacesService = {
  async create(space: SpaceInsert): Promise<SpaceRow> {
    const { data, error } = await supabaseClient
      .from("spaces")
      .insert(space)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, space: SpaceUpdate): Promise<SpaceRow> {
    const { data, error } = await supabaseClient
      .from("spaces")
      .update(space)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabaseClient.from("spaces").delete().eq("id", id);

    if (error) throw error;
  },

  async getAll(): Promise<SpaceRow[]> {
    const { data, error } = await supabaseClient.from("spaces").select("*");

    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<SpaceRow | null> {
    const { data, error } = await supabaseClient
      .from("spaces")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};
