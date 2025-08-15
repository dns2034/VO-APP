import { organizationPagesService } from "@/services/organization-pages.service";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { organizationPagesKeys } from "@/query-keys/organization-pages.keys";

export const useOrganizationPage = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: organizationPagesKeys.byUser(user?.id || ""),
    queryFn: organizationPagesService.getOrganizationPage,
    enabled: !!user?.id,
  });
};
