import { IAuthState } from "@/types/auth.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      token: null,
      setAuth: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);