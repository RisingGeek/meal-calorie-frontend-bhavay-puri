"use client";

import { ChefHat, Target, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CreateMealPlanDialog from './CreateMealPlanDialog';
import { useMealPlanStore } from '@/stores/mealPlanStore';
import MealDayCard from './MealDayCard';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import EditMealPlanDialog from './EditMealPlanDialog';
import { MealPlan } from '@/types/mealPlan.type';
import { useEffect, useState } from 'react';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MealPlanCards = () => {
  const { plans, updatePlan, deletePlan, removeMealFromPlan } = useMealPlanStore();
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  useEffect(() => {
    if (plans.length > 0 && !selectedPlan) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPlan(plans[0]);
    }
  }, [plans, selectedPlan]);

  return (
    <>
      {plans.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar - Plan List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Plans</CardTitle>
                <CardDescription>{plans.length} active plan{plans.length !== 1 ? 's' : ''}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${selectedPlan?.id === plan.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{plan.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {plan.dailyCalorieGoal} cal/day
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Selected Plan */}
          {selectedPlan && (
            <div className="lg:col-span-3 space-y-6">
              {/* Plan Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{selectedPlan.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {selectedPlan.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <EditMealPlanDialog
                        plan={selectedPlan}
                        onUpdatePlan={(updated) => updatePlan(selectedPlan.id, updated)}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon" className="cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Meal Plan?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {`This will permanently delete "${selectedPlan.name}" and all its meals. This action cannot be undone.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deletePlan(selectedPlan.id);
                                setSelectedPlan(plans[0] !== selectedPlan ? plans[0] : null);
                              }}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Daily Goal</p>
                        <p className="text-xl font-bold">{selectedPlan.dailyCalorieGoal}</p>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Schedule */}
              <div className="grid gap-4">
                {DAYS_OF_WEEK.map((day) => (
                  <MealDayCard
                    key={day}
                    day={day}
                    meals={selectedPlan.days[day] || []}
                    dailyGoal={selectedPlan.dailyCalorieGoal}
                    onRemoveMeal={(mealId) => removeMealFromPlan(selectedPlan.id, day, mealId)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

function EmptyState() {
  return (
    <Card className="py-16">
      <CardContent className="flex flex-col items-center text-center">
        <ChefHat className="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="mb-2 text-2xl font-bold">No Meal Plans Yet</h3>
        <p className="mb-6 text-muted-foreground max-w-md">
          Create your first meal plan to start organizing your weekly meals and tracking your nutrition goals.
        </p>
        <CreateMealPlanDialog />
      </CardContent>
    </Card>
  );
}

export default MealPlanCards;
