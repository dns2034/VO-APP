import { create } from "zustand";
import type { User } from "@/types";

type AuthStore = {
  user: undefined | null | User;
  setUser: (user: User | null | undefined) => void;
};

export const authStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}));
