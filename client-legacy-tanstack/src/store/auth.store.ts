import { create } from "zustand";
import type { User } from "@/types";

type State = {
  user: undefined | null | User;
};

type Actions = {
  setUser: (user: User | null | undefined) => void;
};

export const authStore = create<State & Actions>((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}));
