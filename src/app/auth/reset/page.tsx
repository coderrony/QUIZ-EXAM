import { Suspense } from 'react';
import ResetForm from '../_components/ResetForm';
import LoadingIndicator from '@/components/LoadingIndicator';

const ResetPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ResetForm />
    </Suspense>
  );
};

export default ResetPage;
