import { pointsService } from "@/services/points.service";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { pointsKeys } from "@/query-keys";

export function usePoints() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: pointsKeys.byUser(userId ?? ""),
    queryFn: () => pointsService.getUserPoints(userId!),
    enabled: !!userId,
  });
}
