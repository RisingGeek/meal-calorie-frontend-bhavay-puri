import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuthStore } from '@/stores/authStore';
import { useMealStore } from '@/stores/mealStore';
import '@testing-library/jest-dom';
import MealForm from "@/components/MealForm";

// Mock Zustand stores
jest.mock('@/stores/authStore');
jest.mock('@/stores/mealStore');

// Mock fetch API
global.fetch = jest.fn();

describe('MealForm', () => {
  const mockAddMeal = jest.fn();
  const mockSetHistory = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock auth store
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      token: 'fake-jwt-token',
    });

    // Mock meal store
    (useMealStore as unknown as jest.Mock).mockReturnValue({
      nutritionalInfo: null,
      history: [],
      setNutritionalInfo: mockAddMeal,
      setHistory: mockSetHistory
    });
  });

  // TEST 1: Form renders with all required fields
  test('renders meal form with dish name, servings inputs and submit button', () => {
    render(<MealForm />);


    // Check if dish name input is present
    expect(screen.getByRole('button', { name: /Search for a dish/i })).toBeInTheDocument();

    // Check if servings input is present
    expect(screen.getByLabelText(/number of servings/i)).toBeInTheDocument();

    // Check if submit button is present
    expect(screen.getByRole('button', { name: /get calorie info/i })).toBeInTheDocument();
  });

  // ============================================
  // TEST 2: Form validation - shows error for empty dish name
  // ============================================
  test('shows validation error when submitting without dish name', async () => {
    const user = userEvent.setup();
    render(<MealForm />);

    // Get submit button
    const submitButton = screen.getByRole('button', { name: /get calorie info/i });

    // Try to submit without entering dish name
    await user.click(submitButton);

    // Wait for validation error to appear
    await waitFor(() => {
      expect(screen.getByText(/dish name must be at least 2 characters/i)).toBeInTheDocument();
    });

    // Verify API was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // ============================================
  // TEST 3: Successful form submission calls API and displays results
  // ============================================
  test('submits form successfully and calls API with correct data', async () => {
    const user = userEvent.setup();

    // Mock successful API response
    const mockApiResponse = {
      dish_name: 'chicken biryani',
      servings: 2,
      calories_per_serving: 280,
      total_calories: 560,
      source: 'USDA FoodData Central',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<MealForm />);

    // Open the autocomplete dropdown
    const dishButton = screen.getByRole('button', { name: /search for a dish/i });
    await user.click(dishButton);

    // Wait for the input to appear and type dish name
    const searchInput = screen.getByPlaceholderText(/type to search/i);
    await user.type(searchInput, 'chicken biryani');

    // Get servings input and change value
    const servingsInput = screen.getByLabelText(/number of servings/i);
    await user.clear(servingsInput);
    await user.type(servingsInput, '2');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /get calorie info/i });
    await user.click(submitButton);

    // Wait for API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/get-calories',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer fake-jwt-token',
          }),
          body: JSON.stringify({
            dish_name: 'chicken biryani',
            servings: 2,
          }),
        })
      );
    });

    // Verify meal was added to store
    expect(mockAddMeal).toHaveBeenCalledWith(mockApiResponse);
  });

  // ============================================
  // BONUS TEST 4: Handles API error gracefully
  // ============================================
  test('displays error message when API call fails', async () => {
    const user = userEvent.setup();

    // Mock failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: 'Dish not found' }),
    });

    render(<MealForm />);

    // Open autocomplete and enter dish name
    const dishButton = screen.getByRole('button', { name: /search for a dish/i });
    await user.click(dishButton);

    const searchInput = screen.getByPlaceholderText(/type to search/i);
    await user.type(searchInput, 'invalid dish');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /get calorie info/i });
    await user.click(submitButton);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/dish not found/i)).toBeInTheDocument();
    });
  });

  // ============================================
  // BONUS TEST 5: Shows loading state during API call
  // ============================================
  test('shows loading state while submitting form', async () => {
    const user = userEvent.setup();

    // Mock delayed API response
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({
                  dish_name: 'test',
                  servings: 1,
                  calories_per_serving: 100,
                  total_calories: 100,
                  source: 'USDA',
                }),
              }),
            100
          )
        )
    );

    render(<MealForm />);

    // Enter dish name
    const dishButton = screen.getByRole('button', { name: /search for a dish/i });
    await user.click(dishButton);

    const searchInput = screen.getByPlaceholderText(/type to search/i);
    await user.type(searchInput, 'test dish');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /get calorie info/i });
    await user.click(submitButton);

    // Check for loading state
    await waitFor(() => {
      expect(screen.getByText(/searching/i)).toBeInTheDocument();
    });

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/searching/i)).not.toBeInTheDocument();
    });
  });
});