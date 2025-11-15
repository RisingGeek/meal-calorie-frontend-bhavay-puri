"use client";

import React, { useState } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { AlertCircle, Loader2, Search } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICalorieSchema } from '@/types/calorie.type';
import z from 'zod';
import { getCalorieApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useMealStore } from '@/stores/mealStore';

const MealForm = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { history, setNutritionalInfo, setHistory } = useMealStore((store) => store)
  const [error, setError] = useState('');
  // const addMeal = useAuthStore(store => store.addMeal);
  const authToken = useAuthStore(store => store.token);

  const form = useForm<z.infer<typeof ICalorieSchema>>({
    resolver: zodResolver(ICalorieSchema),
    defaultValues: {
      dish_name: '',
      servings: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof ICalorieSchema>) => {
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await getCalorieApi(values, authToken);
      setNutritionalInfo(response.data);
      setHistory([response.data, ...history]);
      // setResult(nutritionalData);
      // addMeal(data);
      form.reset();
    } catch (err: any) {
      setError(err.response.data.error || 'Failed to fetch calorie data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dish_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dish Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., chicken biryani, pizza, pasta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Servings</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={20} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormDescription>
                  Between 1 and 20 servings
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full cursor-pointer" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Get Calorie Info
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default MealForm
