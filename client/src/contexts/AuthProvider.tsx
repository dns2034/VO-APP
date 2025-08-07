import { supabaseClient } from "@/services/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const { data: authStateChange } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setUser(null);
        } else {
          setUser(session.user);
        }
      }
    );

    supabaseClient.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authStateChange.subscription.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}
