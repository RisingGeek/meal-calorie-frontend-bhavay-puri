import z from "zod";

export const ICalorieSchema = z.object({
  dish_name: z.string().min(2, 'Dish name must be at least 3 characters'),
  servings: z.number().min(1, 'Must be at least 1 serving').max(20, 'Maximum 20 servings'),
});

export interface INutritionalInfo {
  calories_per_serving: number;
  dish_name: string;
  servings: number;
  source: string;
  total_calories: number;
}
export interface IMealState {
  nutritionalInfo: INutritionalInfo | null;
  history: INutritionalInfo[];
  setNutritionalInfo: (info: INutritionalInfo) => void;
  setHistory: (history: INutritionalInfo[]) => void;
}