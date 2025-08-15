import { organizationPagesService } from "@/services/user-landing-pages.service";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { organizationPagesKeys } from "@/query-keys/organization-pages.keys";

export const useUserLandingPage = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: organizationPagesKeys.byUser(user?.id || ""),
    queryFn: organizationPagesService.getLandingPage,
    enabled: !!user?.id,
  });
};
