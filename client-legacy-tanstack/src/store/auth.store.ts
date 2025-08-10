import { create } from "zustand";
import type { User } from "@/types";

export type AuthStore = {
  user: undefined | null | User;
  setUser: (user: User | null | undefined) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}));
