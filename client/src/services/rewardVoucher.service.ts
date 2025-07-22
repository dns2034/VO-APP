import { supabaseClient } from "@/services/supabase/client";

import { Database } from "@/types/supabase";

type RewardRow = Database["public"]["Tables"]["reward_vouchers"]["Row"];
type RewardInsert = Database["public"]["Tables"]["reward_vouchers"]["Insert"];
type RewardUpdate = Database["public"]["Tables"]["reward_vouchers"]["Update"];

export class RewardVoucherService {
  static async getAll(): Promise<RewardRow[]> {
    const { data, error } = await supabaseClient
      .from("reward_vouchers")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as RewardRow[];
  }

  static async getById(id: string): Promise<RewardRow | null> {
    const { data, error } = await supabaseClient
      .from("reward_vouchers")
      .select("*")
      .eq("status", "active")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(voucher: RewardInsert): Promise<RewardRow> {
    const { data, error } = await supabaseClient
      .from("reward_vouchers")
      .insert([voucher])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create reward voucher");
    }
    return data;
  }

  static async update(id: string, updates: RewardUpdate): Promise<RewardRow> {
    const { data, error } = await supabaseClient
      .from("reward_vouchers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update reward voucher");
    }
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from("reward_vouchers")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
