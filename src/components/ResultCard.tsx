"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { CircleDot, Database, Flame, Soup, Utensils } from 'lucide-react'
import { useMealStore } from '@/stores/mealStore'
import NutritionalInfoItem from './NutritionalInfoItem';

const ResultCard = () => {
  const nutritionalInfo = useMealStore((store) => store.nutritionalInfo);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Soup size={30} />
              <div>
                <p className="text-2xl">Nutritional information</p>
                <p className="capitalize">{nutritionalInfo?.dish_name}</p>
              </div>
            </CardTitle>
            <CardDescription className="mt-1">

            </CardDescription>
          </div>
          {/* <Badge variant="secondary" className="text-xs">
            {result.source}
          </Badge> */}
        </div>
      </CardHeader>
      <CardContent>
        {nutritionalInfo && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <NutritionalInfoItem label="Servings" value={nutritionalInfo.servings}>
                <Utensils size={60} />
              </NutritionalInfoItem>
              <NutritionalInfoItem label="Calories Per Serving" value={nutritionalInfo.calories_per_serving}>
                <CircleDot size={60} />
              </NutritionalInfoItem>
              <NutritionalInfoItem label="Total Calories" value={nutritionalInfo.total_calories}>
                <Flame size={60} />
              </NutritionalInfoItem>
            </div>
            <div className="flex items-center gap-4 mt-4 border-2 p-4">
              <Database size={30} />
              <div>
                <p className="font-semibold">Data Source</p>
                <p>{nutritionalInfo.source}</p>
              </div>
            </div>
          </>
        )}

      </CardContent>
    </Card>
  )
}

export default ResultCard
