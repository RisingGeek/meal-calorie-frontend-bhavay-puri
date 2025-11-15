"use client";

import { CardDescription, CardTitle } from './ui/card'
import { Clock } from 'lucide-react'
import { useMealStore } from '@/stores/mealStore'
import Link from 'next/link';

const CalorieHistoryHeader = () => {
  const { history } = useMealStore();
  return (
    <>
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Clock />
          Recent Searches
        </CardTitle>
        {history.length > 0 && (
          <Link href="/history">
            View All
          </Link>
        )}
      </div>
      <CardDescription>
        Your last {history.length} meal searches
      </CardDescription>
    </>
  )
}

export default CalorieHistoryHeader
