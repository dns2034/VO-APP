import { QueryClient } from "@tanstack/react-query";
import { authStore as auth } from "@/store/auth.store";

const queryClient = new QueryClient();

const context = {
  queryClient,
  auth,
};

export default context;