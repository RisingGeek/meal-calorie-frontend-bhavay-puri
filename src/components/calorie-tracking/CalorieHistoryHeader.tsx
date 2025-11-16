"use client";

import { CardDescription, CardTitle } from '../ui/card'
import { Clock, Trash2 } from 'lucide-react'
import { useMealStore } from '@/stores/mealStore'
import { Button } from '../ui/button';

const CalorieHistoryHeader = () => {
  const { history, setHistory } = useMealStore();
  return (
    <>
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Clock />
          Recent Searches
        </CardTitle>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setHistory([])}
        >
          <Trash2 className="text-destructive" />
        </Button>
      </div>
      {history.length > 0 && (
        <CardDescription>
          Your last {history.length} meal searches
        </CardDescription>
      )}
    </>
  )
}

export default CalorieHistoryHeader
