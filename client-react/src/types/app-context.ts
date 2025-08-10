import type { QueryClient } from "@tanstack/react-query";
import type { AuthStore } from "@/store/auth.store";

export type AppContext = {
	auth: AuthStore | undefined;
	queryClient: QueryClient | undefined;
};
