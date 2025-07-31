import { supabaseClient } from "./supabase/client";
import { Database } from "@/types/supabase";

type SpaceUnitRow = Database["public"]["Tables"]["space_units"]["Row"];
type SpaceUnitInsert = Database["public"]["Tables"]["space_units"]["Insert"];
type SpaceUnitUpdate = Database["public"]["Tables"]["space_units"]["Update"];

export class SpaceUnitsService {
  static async getAll(): Promise<SpaceUnitRow[]> {
    const { data, error } = await supabaseClient
      .from("space_units")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as SpaceUnitRow[];
  }

  static async getById(id: string): Promise<SpaceUnitRow | null> {
    const { data, error } = await supabaseClient
      .from("space_units")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(spaceUnit: SpaceUnitInsert): Promise<SpaceUnitRow> {
    const { data, error } = await supabaseClient
      .from("space_units")
      .insert([spaceUnit])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create space unit");
    }
    return data;
  }

  static async update(
    id: string,
    updates: SpaceUnitUpdate
  ): Promise<SpaceUnitRow> {
    const { data, error } = await supabaseClient
      .from("space_units")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update space unit");
    }
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from("space_units")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message || "Failed to delete space unit");
    }
  }
}
