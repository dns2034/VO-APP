import { useEffect, useState } from "react";
import supabase from "@/config/supabase-client";
import { AuthContext, type TUser } from "@/contexts/auth-context";
import type { Session } from "@supabase/supabase-js";
import type { LoginField } from "@/lib/validator";
import { fetchUserProfileWithRoleById } from "@/utils/helper";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<TUser>(undefined);

  const login = async (credentials: LoginField) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      console.error("Error logging in:", error);
      return { error };
    }

    return { data };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) {
      console.error("Error logging out:", error);
      return { error };
    }

    return { message: "Logged out successfully" };
  };

  const updateUser = (user: TUser) => {
    setUser(user);
  };

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     if (data.session) {
  //       setSession(data.session);
  //       fetchUser(data.session);
  //     }
  //   };

  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (_event, session) => {
  //       setSession(session);
  //       (async () => {
  //         await fetchUser(session);
  //       })();
  //     }
  //   );

  //   initializeAuth();

  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const handleFocus = async () => {
      await supabase.auth.refreshSession();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  useEffect(() => {
    const fetchUser = async (session: Session | null) => {
      if (!session?.user) {
        setUser(null);
        return;
      }

      const { error, profile } = await fetchUserProfileWithRoleById(
        session.user.id
      );

      if (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
        return;
      }

      if (profile) {
        setUser({ ...session.user, ...profile });
      }
    };

    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);
      fetchUser(data.session);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setSession(null);
          setUser(null);
        } else {
          setSession(session);
          fetchUser(session);
        }
      }
    );

    initializeAuth();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, login, logout, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
