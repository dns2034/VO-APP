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

  const createRewardVoucher = async (
    rewardId: string
  ): Promise<{ voucher: RewardRow | null; error: string | null }> => {
    try {
      const newVoucher = await RewardVoucherService.create({
        reward_id: rewardId,
      });
      setRewardVouchers((prev) => [...prev, newVoucher]);
      return { voucher: newVoucher, error: null };
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || "Failed to create reward voucher";
      console.error("Error creating reward voucher:", error);
      setError(errorMessage);
      return { voucher: null, error: errorMessage };
    }
  };
  return { rewardVouchers, loading, error, createRewardVoucher };
}
