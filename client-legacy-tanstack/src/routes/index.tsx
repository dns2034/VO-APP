import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import supabase from "@/config/supabase-client";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  console.log('rendered App')
  const { authStore } = Route.useRouteContext();
  const { setUser, user } = authStore();

  useEffect(() => {
    const { data: authStateChange } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setUser(null);
        } else {
          console.log("User from authStateChange", session.user);
          setUser(session.user);
        }
      }
    );

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        console.log("User from getSession", data.session.user);
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authStateChange.subscription.unsubscribe();
    };
  }, [setUser]);

  if (user === undefined) return <h1>Loading...</h1>;

  return user ? <Navigate to="/client/book" /> : <Navigate to="/auth/login" />;
}
