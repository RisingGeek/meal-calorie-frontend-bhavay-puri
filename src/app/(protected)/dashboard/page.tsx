import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Flame,
  Apple,
  Search,
  Activity,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Your Calorie Tracking Overview',
  description: 'View your calorie tracking statistics, daily progress, and nutrition insights on your CalScope dashboard. Track your health goals in one place.',
};

export default function DashboardPage() {
  // Calculate statistics
  const todaysMeals = [];
  const todaysCalories = 0;
  const weeklyAverage = 0

  const dailyGoal = 2000; // You can make this configurable
  const goalProgress = Math.min((todaysCalories / dailyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Here&apos;s your nutrition overview
          </p>
        </div>

        {/* Quick Action Card */}
        <Card className="mb-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-900 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
                Ready to log a meal?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Search for calories and track your nutrition
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/calories">
                <Search className="mr-2 h-5 w-5" />
                Search Meals
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Today's Calories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Calories</CardTitle>
              <Flame className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todaysCalories}</div>
              <p className="text-xs text-muted-foreground">
                of {dailyGoal} goal
              </p>
              <Progress value={goalProgress} className="mt-3" />
            </CardContent>
          </Card>

          {/* Meals Today */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Meals Today</CardTitle>
              <Apple className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todaysMeals.length}</div>
              <p className="text-xs text-muted-foreground">
                {todaysMeals.length === 0 ? 'No meals logged yet' : 'meals logged'}
              </p>
            </CardContent>
          </Card>

          {/* Weekly Average */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{weeklyAverage}</div>
              <p className="text-xs text-muted-foreground">
                calories per day
              </p>
            </CardContent>
          </Card>

          {/* Total Tracked */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
              <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                meals searched
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          {/* Today's Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Today&apos;s Progress
              </CardTitle>
              <CardDescription>
                Track your daily calorie intake goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Consumed
                    </p>
                    <p className="text-2xl font-bold">{todaysCalories} cal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Remaining
                    </p>
                    <p className="text-2xl font-bold">
                      {Math.max(0, dailyGoal - todaysCalories)} cal
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Goal
                    </p>
                    <p className="text-2xl font-bold">{dailyGoal} cal</p>
                  </div>
                </div>

                <Progress value={goalProgress} className="h-3" />

                {goalProgress >= 100 ? (
                  <Badge variant="destructive">Goal reached!</Badge>
                ) : goalProgress >= 80 ? (
                  <Badge className="bg-orange-500">Almost there!</Badge>
                ) : (
                  <Badge className="bg-green-500">On track</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}