import LoginForm from '@/components/LoginForm'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Access Your CalScope Account',
  description: 'Sign in to CalScope to track your calories, view your meal history, and manage your nutrition goals. Secure login for your health tracking account.',
};

const LoginPage = () => {
  return (
    <LoginForm />
  )
}

export default LoginPage
