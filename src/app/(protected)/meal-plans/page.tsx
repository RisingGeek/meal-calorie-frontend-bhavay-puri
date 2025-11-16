import CreateMealPlanDialog from '@/components/meal-plan/CreateMealPlanDialog';
import MealPlanCards from '@/components/meal-plan/MealPlanCards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meal Plans - Plan Your Weekly Meals',
  description: 'Create and manage weekly meal plans with CalScope. Organize your meals, set calorie goals, and track your nutrition throughout the week.',
};


export default function MealPlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-foreground">Meal Plans</h1>
            <p className="text-lg text-muted-foreground">
              Create and manage your weekly meal plans
            </p>
          </div>
          <CreateMealPlanDialog />
        </div>
        <MealPlanCards />
      </div>
    </div>
  );
}

// Empty State Component


// Day Card Component
