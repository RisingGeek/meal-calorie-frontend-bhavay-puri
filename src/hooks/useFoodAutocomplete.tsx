import { useMealStore } from "@/stores/mealStore";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { searchFoodSuggestions } from "@/lib/food-api";

export function useFoodAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { history } = useMealStore();
  const debouncedQuery = useDebounce(query, 300); // 300ms delay

  // Get unique dishes from history
  const historyDishes = Array.from(
    new Set(history.map((meal) => meal.dish_name.toLowerCase()))
  );

  const fetchSuggestions = useCallback(async () => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const queryLower = debouncedQuery.toLowerCase();
      
      // Search USDA API
      const apiResults = await searchFoodSuggestions(debouncedQuery, 20);
      
      // Extract food names, clean them, and filter by query match
      const apiSuggestions = apiResults
        .map((food) => food.description.toLowerCase())
        .filter((desc) => 
          desc.length < 100 && // Filter out very long names
          desc.includes(queryLower) // Only include if it contains the query
        );


      // Combine: history first, then API results
      const combined = [
        ...apiSuggestions,
      ];

      // Remove duplicates and limit
      const unique = Array.from(new Set(combined)).slice(0, 10);
      
      setSuggestions(unique);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      
      // Fallback to history only
    } finally {
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return {
    suggestions,
    isLoading,
    hasHistory: historyDishes.some((dish) =>
      suggestions.includes(dish)
    ),
  };
}