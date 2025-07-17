import { useEffect, useState } from "react";
import { RewardsService } from "@/services/rewardsService";

import { Database } from "@/types/supabase";
type RewardRow = Database["public"]["Tables"]["rewards"]["Row"];

export function useRewards() {
  const [rewards, setRewards] = useState<RewardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchRewards = async () => {
    try {
      const data = await RewardsService.getAll();
      setRewards(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch rewards.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchRewards();
}, []);

  return {
    rewards,
    loading,
    error,
  };
}
