'use client';
import { FC, useCallback, useEffect, useState } from 'react';

import { newVerification } from '@/actions/auth/new-verification';
import { useSearchParams } from 'next/navigation';
import FormSuccess from '@/components/FormSuccess';
import FormError from '@/components/FormError';

import { AuthWrapper } from './AuthWrapper';
import { BeatLoader } from 'react-spinners';

interface NewVerificationFormProps {
  className?: string;
}

const NewVerificationForm: FC<NewVerificationFormProps> = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!');
      return;
    }

    newVerification(token)
      .then((data: { error?: string; success?: string }) => {
        if (data.error) {
          setError(data.error);
          setSuccess('');
        } else if (data.success) {
          setSuccess(data.success);

          setError('');
        }
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <AuthWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
      showSocial={false}
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </AuthWrapper>
  );
};

export default NewVerificationForm;
