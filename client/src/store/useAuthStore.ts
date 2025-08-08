import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

type State = {
  user: User | null | undefined;
  //   session: Session | null;
};

type Action = {
  setUser: (user: User | null | undefined) => void;
  //   setSession: (session: Session | null) => void;
};

export const useAuthStore = create<State & Action>()((set) => ({
  user: undefined,
  //   session: null,
  setUser: (user) => set({ user }),
  //   setSession: (session) => set({ session }),
}));
