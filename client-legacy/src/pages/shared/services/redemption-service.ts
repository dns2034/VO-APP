import supabase from "@/config/supabase-client";
import type {
  TSortField,
  TSortDirection,
  TRedemptionStatusFilter,
} from "@/lib/types";
import type { TRedemption, TRedemptionWithReward } from "@/types";

export const fetchRedemptionCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("redemptions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return count || 0;
};

export const fetchRedemptions = async (
  userId: string,
  page: number,
  pageSize: number,
  sortField: TSortField,
  sortDirection: TSortDirection,
  statusFilter: TRedemptionStatusFilter
) => {
  let query = supabase
    .from("redemptions")
    .select("*,reward:rewards (*)")
    .eq("user_id", userId)
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order(sortField, { ascending: sortDirection === "asc" });

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter as TRedemption["status"]);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return (data as TRedemptionWithReward[]) || [];
};
