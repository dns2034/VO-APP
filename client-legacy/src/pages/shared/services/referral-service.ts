import supabase from "@/config/supabase-client";
import type { TMaskedReferral } from "@/types";
import type { TMaskedUserQueryProps } from "../../client/referral/queries";

export const getClientReferralCount = async (
  userId: string
): Promise<number> => {
  const { count, error } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw error;
  return count || 0;
};

export const getClientMaskedReferrals = async ({
  userId,
  options,
}: Omit<TMaskedUserQueryProps, "pathname">): Promise<{
  maskedReferrals: TMaskedReferral[];
  total: number;
}> => {
  let query = supabase
    .from("masked_referrals")
    .select("id, masked_client_name, status, created_at", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at");

  if (options.status) {
    query = query.eq("status", options.status);
  }

  const start = (options.page - 1) * options.pageSize;
  const end = start + options.pageSize - 1;

  const { data, error, count } = await query.range(start, end);

  if (error) throw error;
  return {
    maskedReferrals: (data as TMaskedReferral[]) || [],
    total: count || 0,
  };
};
