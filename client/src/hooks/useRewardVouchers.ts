import { RewardVoucherService } from "@/services/rewardVoucher.service";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { toast } from "sonner";

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
        setError("Failed to fetch reward vouchers" + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRewardVouchers();
  }, []);

  const createRewardVoucher = async (reward_id: string): Promise<void> => {
    try {
      const newVoucher = await RewardVoucherService.create({ reward_id });
      setRewardVouchers((prev) => [...prev, newVoucher]);
      toast.success("Reward Voucher Created!", {
        description: `Successfully created voucher for reward ID ${reward_id}.`,
      });
    } catch (error) {
      toast.error("Voucher Creation Failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return { rewardVouchers, loading, error, createRewardVoucher };
}
