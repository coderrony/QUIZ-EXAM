import { Suspense } from 'react';
import RegisterForm from '../_components/RegisterForm';
import LoadingIndicator from '@/components/LoadingIndicator';

const RegisterPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
