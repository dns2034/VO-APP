import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type RewardInsert = Database["public"]["Tables"]["reward_vouchers"]["Insert"];
type RewardUpdate = Database["public"]["Tables"]["reward_vouchers"]["Update"];

export const rewardVouchersService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("reward_vouchers")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("reward_vouchers")
      .select("*")
      .eq("status", "active")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (voucher: RewardInsert) => {
    const { data, error } = await supabase
      .from("reward_vouchers")
      .insert([voucher])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create reward voucher");
    }
    return data;
  },

  update: async (id: string, updates: RewardUpdate) => {
    const { data, error } = await supabase
      .from("reward_vouchers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update reward voucher");
    }
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from("reward_vouchers")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};
