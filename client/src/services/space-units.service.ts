import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type SpaceUnitInsert = Database["public"]["Tables"]["space_units"]["Insert"];
type SpaceUnitUpdate = Database["public"]["Tables"]["space_units"]["Update"];

export const spaceUnitsService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("space_units")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("space_units")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (spaceUnit: SpaceUnitInsert) => {
    const { data, error } = await supabase
      .from("space_units")
      .insert([spaceUnit])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create space unit");
    }
    return data;
  },

  update: async (id: string, updates: SpaceUnitUpdate) => {
    const { data, error } = await supabase
      .from("space_units")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update space unit");
    }
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("space_units").delete().eq("id", id);

    if (error) {
      throw new Error(error.message || "Failed to delete space unit");
    }
  },

  getBySpaceId: async ({ spaceId }: { spaceId: string }) => {
    const { data, error } = await supabase
      .from("space_units")
      .select("*")
      .eq("space_id", spaceId);

    if (error) throw error;
    return data;
  },
};
