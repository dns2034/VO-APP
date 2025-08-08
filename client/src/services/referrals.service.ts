import { supabaseClient } from "./supabase/client";
import { Database } from "@/types/supabase";

type ReferralRow = Database["public"]["Tables"]["referrals"]["Row"];

export const ReferralsService = {
  async getAll(): Promise<ReferralRow[]> {
    const { data, error } = await supabaseClient
      .from("referrals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as ReferralRow[];
  },
  async getById(id: string): Promise<ReferralRow | null> {
    const { data, error } = await supabaseClient
      .from("referrals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};
