import AuthForm from '@/components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Create Your Free CalScope Account',
  description: 'Create your free CalScope account and start tracking calories today. Join thousands of users achieving their health goals with our smart meal planner.',
};

const RegisterPage = () => {
  return (
    <div>
      <AuthForm />
    </div>
  )
}

export default RegisterPage;
