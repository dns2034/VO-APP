import { supabaseClient } from "./supabase/client";
import { Database } from "@/types/supabase";

type SpaceAvailabilityRow =
  Database["public"]["Tables"]["space_availability"]["Row"];

export class SpaceAvailabilityService {
  static async getAvailableSpaces(
    date?: string
  ): Promise<SpaceAvailabilityRow[]> {
    let query = supabaseClient.from("space_availability").select("*");
    if (date) {
      query = query.eq("date", date);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
  static async getBySpaceId(spaceId: string): Promise<SpaceAvailabilityRow[]> {
    const { data, error } = await supabaseClient
      .from("space_availability")
      .select("*")
      .eq("space_id", spaceId);

    if (error) throw error;
    return data;
  }

  static async create(
    availability: Omit<SpaceAvailabilityRow, "id" | "created_at">
  ): Promise<SpaceAvailabilityRow> {
    const { data, error } = await supabaseClient
      .from("space_availability")
      .insert([availability])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
