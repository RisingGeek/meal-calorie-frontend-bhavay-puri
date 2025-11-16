import { Calendar, Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Meal } from "@/types/mealPlan.type";

const MealDayCard = ({
  day,
  meals,
  dailyGoal,
  onRemoveMeal,
}: {
  day: string;
  meals: Meal[];
  dailyGoal: number;
  onRemoveMeal: (mealId: string) => void;
}) => {
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

export default MealDayCard;