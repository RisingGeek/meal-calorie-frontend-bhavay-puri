import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MealForm from "@/components/MealForm";
import ResultCard from "@/components/ResultCard";
import { Search } from "lucide-react";
import CalorieHistory from "@/components/CalorieHistory";
import CalorieHistoryHeader from "@/components/CalorieHistoryHeader";

function CaloriePage() {

  return (
    <div className="max-w-300 mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold">Calorie Tracker</h1>
      <h2 className="text-xl text-center">Get Precise Calorie counts for any dish</h2>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* Calorie Lookup */}
        <div className="flex flex-col flex-1 order-1 lg:order-1 gap-6">
          <Card className="order-1 lg:order-none">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Search />
                Search Meal Calories
              </CardTitle>
              <CardDescription>
                Enter a dish name and servings to get nutritional information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MealForm />
            </CardContent>
          </Card>
          {/* History Sidebar */}
          <Card className="h-full">
            <CardHeader>
              <CalorieHistoryHeader />
            </CardHeader>
            <CardContent>
              <CalorieHistory />
            </CardContent>
          </Card>
        </div>

        {/* Result Card */}
        <div className="flex-1 order-2">
          <ResultCard />
        </div>
      </div>
    </div>
  );
}

export default CaloriePage;