import { RewardVoucherService } from "@/services/rewardVoucher.service";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type RewardRow = Database["public"]["Tables"]["reward_vouchers"]["Row"];

export function useRewardVouchers() {
  const [rewardVouchers, setRewardVouchers] = useState<RewardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRewardVouchers = async () => {
      try {
        const data = await RewardVoucherService.getAll();
        setRewardVouchers(data);
      } catch (error) {
        console.error("Error fetching reward vouchers:", error);
        setError("Failed to fetch reward vouchers");
      } finally {
        setLoading(false);
      }
    };

    fetchRewardVouchers();
  }, []);

  return { rewardVouchers, loading, error };
}
