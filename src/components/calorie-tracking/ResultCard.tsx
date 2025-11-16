"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { CircleDot, Database, Flame, Soup, TextSearch, Utensils } from 'lucide-react'
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
        {!nutritionalInfo && (
          <div className="text-center py-8">
            <TextSearch className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Start searching to view nutritional information
            </p>
          </div>
        )}
        {nutritionalInfo && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <NutritionalInfoItem label="Servings" value={nutritionalInfo.servings}>
                <Utensils size={60} color='skyblue' />
              </NutritionalInfoItem>
              <NutritionalInfoItem label="Calories Per Serving" value={nutritionalInfo.calories_per_serving}>
                <CircleDot size={60} />
              </NutritionalInfoItem>
              <NutritionalInfoItem label="Total Calories" value={nutritionalInfo.total_calories}>
                <Flame size={60} color='orange' />
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
