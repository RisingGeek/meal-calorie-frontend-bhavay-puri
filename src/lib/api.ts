import { loginSchema, registerSchema } from "@/types/auth.type";
import { ICalorieSchema } from "@/types/calorie.type";
import axios from "axios";
import z from "zod";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export const registerUserApi = async (userData: z.infer<typeof registerSchema>) => {
  return await api.post('/auth/register', userData);
}

export const loginUserApi = async (loginData: z.infer<typeof loginSchema>) => {
  return await api.post('/auth/login', loginData);
}

export const getCalorieApi = async (mealData: z.infer<typeof ICalorieSchema>, token: string) => {
  return await api.post('/get-calories', mealData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}