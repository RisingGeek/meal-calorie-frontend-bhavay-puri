export interface FoodSuggestion {
  fdcId: number;
  description: string;
  dataType: string;
  brandOwner?: string;
}

export async function searchFoodSuggestions(query: string, limit: number = 10): Promise<FoodSuggestion[]> {
  const USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY || 'DEMO_KEY';
  const USDA_API_BASE = 'https://api.nal.usda.gov/fdc/v1';
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `${USDA_API_BASE}/foods/search?query=${encodeURIComponent(query)}&pageSize=${limit}&api_key=${USDA_API_KEY}`
    );

    if (!response.ok) {
      console.error('USDA API error:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.foods || [];
  } catch (error) {
    console.error('Error fetching food suggestions:', error);
    return [];
  }
}