'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Plus,
  Trash2,
  Edit,
  Target,
  TrendingUp,
  ChefHat,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// export const metadata: Metadata = {
//   title: 'Meal Plans - Plan Your Weekly Meals',
//   description: 'Create and manage weekly meal plans with CalScope. Organize your meals, set calorie goals, and track your nutrition throughout the week.',
// };

// Types
interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
}

interface MealPlan {
  id: string;
  name: string;
  description: string;
  dailyCalorieGoal: number;
  days: {
    [key: string]: Meal[];
  };
  createdAt: string;
}

interface MealPlanState {
  plans: MealPlan[];
  addPlan: (plan: MealPlan) => void;
  updatePlan: (id: string, plan: Partial<MealPlan>) => void;
  deletePlan: (id: string) => void;
  addMealToPlan: (planId: string, day: string, meal: Meal) => void;
  removeMealFromPlan: (planId: string, day: string, mealId: string) => void;
}

// Zustand Store
const useMealPlanStore = create<MealPlanState>()(
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

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlansPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { plans, addPlan, updatePlan, deletePlan, addMealToPlan, removeMealFromPlan } = useMealPlanStore();
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (plans.length > 0 && !selectedPlan) {
      setSelectedPlan(plans[0]);
    }
  }, [plans, selectedPlan]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-foreground">Meal Plans</h1>
            <p className="text-lg text-muted-foreground">
              Create and manage your weekly meal plans
            </p>
          </div>
        </div>

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
                      className={`w-full rounded-lg border p-3 text-left transition-all ${
                        selectedPlan?.id === plan.id
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
                        <EditPlanDialog
                          plan={selectedPlan}
                          onUpdatePlan={(updated) => updatePlan(selectedPlan.id, updated)}
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Meal Plan?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{selectedPlan.name}" and all its meals. This action cannot be undone.
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
                      <PlanStats plan={selectedPlan} />
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Schedule */}
                <div className="grid gap-4">
                  {DAYS_OF_WEEK.map((day) => (
                    <DayCard
                      key={day}
                      day={day}
                      meals={selectedPlan.days[day] || []}
                      dailyGoal={selectedPlan.dailyCalorieGoal}
                      onAddMeal={(meal) => addMealToPlan(selectedPlan.id, day, meal)}
                      onRemoveMeal={(mealId) => removeMealFromPlan(selectedPlan.id, day, mealId)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  const { addPlan } = useMealPlanStore();
  
  return (
    <Card className="py-16">
      <CardContent className="flex flex-col items-center text-center">
        <ChefHat className="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="mb-2 text-2xl font-bold">No Meal Plans Yet</h3>
        <p className="mb-6 text-muted-foreground max-w-md">
          Create your first meal plan to start organizing your weekly meals and tracking your nutrition goals.
        </p>
        <CreatePlanDialog onCreatePlan={(plan) => addPlan(plan)} />
      </CardContent>
    </Card>
  );
}

// Create Plan Dialog
function CreatePlanDialog({ onCreatePlan }: { onCreatePlan: (plan: MealPlan) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dailyGoal, setDailyGoal] = useState('2000');

  const handleCreate = () => {
    if (!name.trim()) return;

    const newPlan: MealPlan = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      dailyCalorieGoal: parseInt(dailyGoal) || 2000,
      days: {},
      createdAt: new Date().toISOString(),
    };

    onCreatePlan(newPlan);
    setOpen(false);
    setName('');
    setDescription('');
    setDailyGoal('2000');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Meal Plan</DialogTitle>
          <DialogDescription>
            Set up a new meal plan with your daily calorie goals
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              placeholder="e.g., Weight Loss Plan, Bulking Diet"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your meal plan goals"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dailyGoal">Daily Calorie Goal</Label>
            <Input
              id="dailyGoal"
              type="number"
              placeholder="2000"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Create Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Edit Plan Dialog
function EditPlanDialog({ plan, onUpdatePlan }: { plan: MealPlan; onUpdatePlan: (updated: Partial<MealPlan>) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(plan.name);
  const [description, setDescription] = useState(plan.description);
  const [dailyGoal, setDailyGoal] = useState(plan.dailyCalorieGoal.toString());

  const handleUpdate = () => {
    if (!name.trim()) return;

    onUpdatePlan({
      name: name.trim(),
      description: description.trim(),
      dailyCalorieGoal: parseInt(dailyGoal) || 2000,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Meal Plan</DialogTitle>
          <DialogDescription>Update your meal plan details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Plan Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-dailyGoal">Daily Calorie Goal</Label>
            <Input
              id="edit-dailyGoal"
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!name.trim()}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Plan Stats Component
function PlanStats({ plan }: { plan: MealPlan }) {
  const totalMeals = Object.values(plan.days).reduce((sum, meals) => sum + meals.length, 0);
  const totalCalories = Object.values(plan.days).reduce(
    (sum, meals) => sum + meals.reduce((mealSum, meal) => mealSum + meal.calories, 0),
    0
  );
  const averageDaily = totalMeals > 0 ? Math.round(totalCalories / 7) : 0;

  return (
    <>
      <div className="flex items-center gap-2">
        <ChefHat className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm text-muted-foreground">Total Meals</p>
          <p className="text-xl font-bold">{totalMeals}</p>
        </div>
      </div>
      <Separator orientation="vertical" className="h-12" />
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm text-muted-foreground">Avg Daily</p>
          <p className="text-xl font-bold">{averageDaily} cal</p>
        </div>
      </div>
    </>
  );
}

// Day Card Component
function DayCard({
  day,
  meals,
  dailyGoal,
  onAddMeal,
  onRemoveMeal,
}: {
  day: string;
  meals: Meal[];
  dailyGoal: number;
  onAddMeal: (meal: Meal) => void;
  onRemoveMeal: (mealId: string) => void;
}) {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const progress = (totalCalories / dailyGoal) * 100;
  const isOverGoal = totalCalories > dailyGoal;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">{day}</CardTitle>
              <CardDescription>
                {totalCalories} / {dailyGoal} cal
                {isOverGoal && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    Over goal
                  </Badge>
                )}
              </CardDescription>
            </div>
          </div>
          <AddMealDialog day={day} onAddMeal={onAddMeal} />
        </div>
        <div className="mt-2">
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className={`h-2 rounded-full transition-all ${
                isOverGoal ? 'bg-destructive' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </CardHeader>
      {meals.length > 0 && (
        <CardContent>
          <div className="space-y-2">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{meal.calories} cal</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveMeal(meal.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Add Meal Dialog
function AddMealDialog({ day, onAddMeal }: { day: string; onAddMeal: (meal: Meal) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [time, setTime] = useState('breakfast');

  const handleAdd = () => {
    if (!name.trim() || !calories) return;

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: name.trim(),
      calories: parseInt(calories),
      time: time,
    };

    onAddMeal(newMeal);
    setOpen(false);
    setName('');
    setCalories('');
    setTime('breakfast');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Meal to {day}</DialogTitle>
          <DialogDescription>Add a new meal to your plan</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Meal Name</Label>
            <Input
              id="meal-name"
              placeholder="e.g., Grilled Chicken Salad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meal-calories">Calories</Label>
            <Input
              id="meal-calories"
              type="number"
              placeholder="350"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meal-time">Meal Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="meal-time">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!name.trim() || !calories}>
            Add Meal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}