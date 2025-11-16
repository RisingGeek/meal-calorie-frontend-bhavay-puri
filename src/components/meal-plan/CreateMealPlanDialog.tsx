"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { MealPlan } from "@/types/mealPlan.type";
import { Plus } from "lucide-react";
import { useMealPlanStore } from "@/stores/mealPlanStore";

const CreateMealPlanDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dailyGoal, setDailyGoal] = useState('2000');
  const { addPlan } = useMealPlanStore();

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

    addPlan(newPlan);
    setOpen(false);
    setName('');
    setDescription('');
    setDailyGoal('2000');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 md:flex-none">
          <Plus />
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

export default CreateMealPlanDialog;