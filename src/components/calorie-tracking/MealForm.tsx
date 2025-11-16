'use client';

import { useState } from 'react';
import { useMealStore } from '@/stores/mealStore';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Loader2, AlertCircle, Search, Check, ChevronDown, Clock, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { useFoodAutocomplete } from '@/hooks/useFoodAutocomplete';
import { getCalorieApi } from '@/lib/api';
import { ICalorieSchema } from '@/types/calorie.type';
import { toast } from 'sonner';

type CalorieFormValues = z.infer<typeof ICalorieSchema>;

export default function MealForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { token } = useAuthStore();
  const { setNutritionalInfo, setHistory, history } = useMealStore();

  // Use the autocomplete hook
  const { suggestions, isLoading: isFetchingSuggestions } = useFoodAutocomplete(searchQuery);

  const form = useForm<CalorieFormValues>({
    resolver: zodResolver(ICalorieSchema),
    defaultValues: {
      dish_name: '',
      servings: 1,
    },
  });

  const historyDishes = Array.from(
    new Set(history.map((meal) => meal.dish_name.toLowerCase()))
  );

  const onSubmit = async (values: CalorieFormValues) => {
    setError('');
    setLoading(true);

    try {
      const validDishName = values.dish_name.replace(/[^a-z0-9\s\-,']/gi, "");

      if (!token) {
        return;
      }

      const response = await getCalorieApi({ dish_name: validDishName, servings: values.servings }, token);

      toast.success('Calorie data fetched successfully!');
      setNutritionalInfo(response.data);
      setHistory([response.data, ...history])
      form.reset();
      setSearchQuery('');
    } catch (err: any) {
      setError(err.response.data.error || 'Failed to fetch calorie data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDish = (dish: string) => {
    form.setValue('dish_name', dish);
    setSearchQuery(dish);
    setOpen(false);
  };

  // Separate history and API suggestions
  const historySuggestions = suggestions.filter((s) => historyDishes.includes(s));
  const apiSuggestions = suggestions.filter((s) => !historyDishes.includes(s));

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
              <FormItem className="flex flex-col">
                <FormLabel>Dish Name</FormLabel>
                <Command shouldFilter={true} filter={(value, search) => {
                  // Custom filter: check if value includes search term
                  if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                  return 0;
                }}>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                          type="button"
                        >
                          <span className="truncate">
                            {field.value || 'Search for a dish...'}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>

                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                      <CommandInput
                        placeholder="Type to search..."
                        value={searchQuery}
                        onValueChange={(value) => {
                          setSearchQuery(value);
                          form.setValue('dish_name', value);
                        }}
                      />

                      <CommandList>
                        {isFetchingSuggestions ? (
                          <div className="flex items-center justify-center py-6">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">
                              Searching...
                            </span>
                          </div>
                        ) : searchQuery.length < 2 ? (
                          <CommandEmpty>
                            Type at least 2 characters to search
                          </CommandEmpty>
                        ) : suggestions.length === 0 ? (
                          <CommandEmpty className="p-2">
                            No dishes found. Try a different search term.
                          </CommandEmpty>
                        ) : (
                          <>
                            {historySuggestions.length > 0 && (
                              <CommandGroup heading="Recent Searches">
                                {historySuggestions.map((dish) => (
                                  <CommandItem
                                    key={`history-${dish}`}
                                    value={dish}
                                    onSelect={() => handleSelectDish(dish)}
                                    className="cursor-pointer"
                                  >
                                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                                    <span className="capitalize">{dish}</span>
                                    {field.value === dish && (
                                      <Check className="ml-auto h-4 w-4 text-primary" />
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            )}
                            {apiSuggestions.length > 0 && (
                              <CommandGroup heading="USDA Food Database">
                                {apiSuggestions.map((dish) => (
                                  <CommandItem
                                    key={`api-${dish}`}
                                    value={dish}
                                    onSelect={() => handleSelectDish(dish)}
                                    className="cursor-pointer"
                                  >
                                    <Sparkles className="mr-2 h-4 w-4 text-green-500" />
                                    <span className="capitalize">{dish}</span>
                                    {field.value === dish && (
                                      <Check className="ml-auto h-4 w-4 text-primary" />
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            )}
                          </>
                        )}
                      </CommandList>
                    </PopoverContent>
                  </Popover>
                </Command>
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
                  <Input
                    type="number"
                    min={1}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value ? e.target.valueAsNumber : "")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full cursor-pointer" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
  );
}