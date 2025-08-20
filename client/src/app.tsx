import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import supabase from "./config/supabase-client";
import { queryClient } from "./lib/query-client";
import { router } from "./router";
import { useAuthStore } from "./store/auth.store";

export default function App() {
  const auth = useAuthStore();
  useEffect(() => {
    const { data: authStateChange } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          auth.setUser(null);
        } else {
          auth.setUser(session.user);
        }
      }
    );

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        auth.setUser(data.session.user);
      } else {
        auth.setUser(null);
      }
    });

    return () => {
      authStateChange.subscription.unsubscribe();
    };
  }, [auth.setUser]);

  if (auth.user === undefined)
    return <h1 className="text-5xl">Loading from app.tsx...</h1>;

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster closeButton />
      <RouterProvider router={router} context={{ auth, queryClient }} />
    </QueryClientProvider>
  );
}
