import { supabase } from "@/app/services/supabase/client";

import { Database } from "@/types/supabase";

type RewardRow = Database["public"]["Tables"]["rewards"]["Row"];
type RewardInsert = Database["public"]["Tables"]["rewards"]["Insert"];
type RewardUpdate = Database["public"]["Tables"]["rewards"]["Update"];


export class RewardsService {
  static async getAll(): Promise<RewardRow[]> {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as RewardRow[];
  }

  static async getById(id: string): Promise<RewardRow | null> {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(reward: RewardInsert): Promise<RewardRow> {
    const { data, error } = await supabase
      .from("rewards")
      .insert([reward])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, updates: RewardUpdate): Promise<RewardRow> {
    const { data, error } = await supabase
      .from("rewards")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("rewards")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}