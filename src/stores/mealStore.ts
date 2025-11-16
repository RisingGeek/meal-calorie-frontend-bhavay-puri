import { IMealState, INutritionalInfo } from "@/types/calorie.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMealStore = create<IMealState>()(
  persist(
    (set) => ({
      nutritionalInfo: null,
      history: [],
      setNutritionalInfo: (nutritionalInfo) => set({ nutritionalInfo }),
      setHistory: (history: INutritionalInfo[]) => set({ history })
    }),
    {
      name: 'meal-storage',
      partialize: (state) => ({ history: state.history })
    }
  )
);