export interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  dailyCalorieGoal: number;
  days: {
    [key: string]: Meal[];
  };
  createdAt: string;
}

export interface MealPlanState {
  plans: MealPlan[];
  addPlan: (plan: MealPlan) => void;
  updatePlan: (id: string, plan: Partial<MealPlan>) => void;
  deletePlan: (id: string) => void;
  addMealToPlan: (planId: string, day: string, meal: Meal) => void;
  removeMealFromPlan: (planId: string, day: string, mealId: string) => void;
}