import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;

  setToken: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,

      setToken: (token: string) => {
        set({ token });
      },

      logout: () => {
        set({ token: null });
      },

      getToken: () => {
        return get().token;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
