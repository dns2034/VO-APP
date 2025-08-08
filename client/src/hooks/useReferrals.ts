import { ReferralsService } from "@/services/referrals.service";
import { Database } from "@/types/supabase";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type ReferralRow = Database["public"]["Tables"]["referrals"]["Row"];

export function useReferrals(options?: UseQueryOptions<ReferralRow[]>) {
  return useQuery<ReferralRow[]>({
    queryKey: ["referrals"],
    queryFn: ReferralsService.getAll,
    ...options,
  });
}
