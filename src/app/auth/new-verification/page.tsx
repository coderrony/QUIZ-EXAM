import { Suspense } from 'react';
import NewVerificationForm from '../_components/NewVerificationForm';
import LoadingIndicator from '@/components/LoadingIndicator';

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
