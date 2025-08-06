import supabase from "@/config/supabase-client";
import type { TRewardType } from "@/lib/types";
import type { TReward, TVoucher } from "@/types";

export const fetchRewards = async () => {
  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .order("price", { ascending: true });

  if (error) throw error;

  return data;
};

export const redeemReward = async ({
  userId,
  rewardId,
}: {
  userId: string;
  rewardId: string;
}) => {
  const { data, error } = await supabase
    .from("redemptions")
    .insert([
      {
        user_id: userId,
        reward_id: rewardId,

        // added to fix type error for now
        expires_at: "",
        voucher_code: "",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getRewards = async ({
  rewardType,
  currentPage,
  pageSize,
}: {
  rewardType: TRewardType;
  currentPage: number;
  pageSize: number;
}): Promise<TReward[]> => {
  const query = supabase.from("rewards").select();

  if (rewardType === "credits") {
    query.eq("type", "credits");
  } else if (rewardType === "points") {
    query.eq("type", "points");
  }
  query.range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data as TReward[];
};

// @todo - refactor for infinite scroll
export const getUserVouchers = async ({
  userId,
  status = "AVAILABLE",
}: {
  userId: string;
  status?: TVoucher["status"];
}) => {
  const { data, error } = await supabase
    .from("vouchers")
    .select("*")
    .eq("user_id", userId)
    .eq("status", status);

  if (error) throw new Error(error.message);

  return data as TVoucher[];
};

export const transferVoucher = async ({
  userId,
  recipientEmail,
  voucherId,
  message,
}: {
  userId: string;
  recipientEmail: string;
  voucherId: string;
  message?: string;
}) => {
  const { data, error } = await supabase.rpc("transfer_voucher", {
    from_user: userId,
    to_user_email: recipientEmail,
    voucher_id: voucherId,
    message,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const checkIfUserExistsViaEmail = async ({
  email,
}: {
  email: string;
}) => {
  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (!data) return false;

  return true;
};

export async function getRewardRedemptionHistory(
  date: {
    from?: Date;
    to?: Date;
  },
  {
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  },
  user_id: string
) {
  if (user_id !== "all") {
    const { data, error, count } = await supabase
      .from("reward_redemption_history")
      .select("*", { count: "exact" })
      .eq("user_id", user_id)
      .gte("redeemed_at", date.from?.toISOString())
      .lte("redeemed_at", date.to?.toISOString())
      .range((page - 1) * pageSize, page * pageSize - 1);

    return {
      data,
      count,
      error,
    };
  }

  const { data, error, count } = await supabase
    .from("reward_redemption_history")
    .select("*", { count: "exact" })
    .gte("redeemed_at", date.from?.toISOString())
    .lte("redeemed_at", date.to?.toISOString())
    .range((page - 1) * pageSize, page * pageSize - 1);

  return {
    data,
    count,
    error,
  };
}
