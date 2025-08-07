import { UserService } from "@/services/user.service";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

export function useUser(options?: UseQueryOptions<User | null>) {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: UserService.getUser,
    ...options,
  });
}
