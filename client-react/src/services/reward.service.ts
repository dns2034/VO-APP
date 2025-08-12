import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type RewardInsert = Database["public"]["Tables"]["rewards"]["Insert"];
type RewardUpdate = Database["public"]["Tables"]["rewards"]["Update"];

export const rewardsService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (reward: RewardInsert) => {
    const { data, error } = await supabase
      .from("rewards")
      .insert([reward])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: RewardUpdate) => {
    const { data, error } = await supabase
      .from("rewards")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("rewards").delete().eq("id", id);

    if (error) throw error;
  },
};
