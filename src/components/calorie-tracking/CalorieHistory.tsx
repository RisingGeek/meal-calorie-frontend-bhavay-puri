"use client";

import { TrendingUp } from 'lucide-react'
import { useMealStore } from '@/stores/mealStore';

const CalorieHistory = () => {
  const { history } = useMealStore();

  return (
    <>
      {history.length === 0 ? (
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No searches yet
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Start tracking your meals
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {history.map((meal, idx) => (
            <div key={idx} className="flex justify-between border-2 p-4">
              <div>
                <p className="font-semibold text-lg capitalize text-slate-900 dark:text-white">
                  {meal.dish_name}
                </p>
                <p className="text-slate-600 dark:text-slate-400">{meal.servings} servings</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {meal.total_calories} cal
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {meal.calories_per_serving} cal / serving
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default CalorieHistory
