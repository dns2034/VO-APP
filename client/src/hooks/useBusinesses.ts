import BusinessesService from "@/services/businesses.service";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Database } from "@/types/supabase";

type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];

export function useBusinesses(options?: UseQueryOptions<BusinessRow[]>) {
  return useQuery<BusinessRow[]>({
    queryKey: ["businesses"],
    queryFn: BusinessesService.getAll,
    ...options,
  });
}
