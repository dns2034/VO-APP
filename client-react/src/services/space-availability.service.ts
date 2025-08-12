import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type SpaceAvailabilityInsert =
  Database["public"]["Tables"]["space_availability"]["Insert"];

export const spaceAvailabilityService = {
  getAvailableByDateAndSpaceId: async ({
    date,
    spaceId,
  }: {
    date: string;
    spaceId: string;
  }) => {
    const { data, error } = await supabase
      .from("space_availability")
      .select("*")
      .eq("date", date)
      .eq("space_id", spaceId).maybeSingle();

    if (error) throw error;
    return data;
  },

  getBySpaceId: async (spaceId: string) => {
    const { data, error } = await supabase
      .from("space_availability")
      .select("*")
      .eq("space_id", spaceId);

    if (error) throw error;
    return data;
  },

  create: async (availability: SpaceAvailabilityInsert) => {
    const { data, error } = await supabase
      .from("space_availability")
      .insert([availability])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
