import z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters'),
});

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters'),
});

export interface IAuthState {
  token: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
}