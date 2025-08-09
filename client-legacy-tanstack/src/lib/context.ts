import { QueryClient } from "@tanstack/react-query";
import { authStore} from "@/store/auth.store";

const queryClient = new QueryClient();

const context = {
  queryClient,
  authStore,
};

export type AppContext = typeof context;
export default context;