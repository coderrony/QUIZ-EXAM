import { Suspense } from 'react';
import NewPasswordForm from '../_components/NewPasswordForm';
import LoadingIndicator from '@/components/LoadingIndicator';

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
