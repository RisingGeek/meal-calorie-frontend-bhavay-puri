import { MealPlanState } from "@/types/mealPlan.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMealPlanStore = create<MealPlanState>()(
  persist(
    (set) => ({
      plans: [],
      addPlan: (plan) =>
        set((state) => ({
          plans: [...state.plans, plan],
        })),
      updatePlan: (id, updatedPlan) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === id ? { ...plan, ...updatedPlan } : plan
          ),
        })),
      deletePlan: (id) =>
        set((state) => ({
          plans: state.plans.filter((plan) => plan.id !== id),
        })),
      addMealToPlan: (planId, day, meal) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === planId
              ? {
                ...plan,
                days: {
                  ...plan.days,
                  [day]: [...(plan.days[day] || []), meal],
                },
              }
              : plan
          ),
        })),
      removeMealFromPlan: (planId, day, mealId) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === planId
              ? {
                ...plan,
                days: {
                  ...plan.days,
                  [day]: (plan.days[day] || []).filter((m) => m.id !== mealId),
                },
              }
              : plan
          ),
        })),
    }),
    {
      name: 'meal-plans-storage',
    }
  )
);