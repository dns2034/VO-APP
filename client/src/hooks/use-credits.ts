import { creditsService } from "@/services/credits.service";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { creditsKeys } from "@/query-keys";

export function useCredits() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: creditsKeys.byUser(userId ?? ""),
    queryFn: () => creditsService.getUserCredits(userId!),
    enabled: !!userId,
  });
}
