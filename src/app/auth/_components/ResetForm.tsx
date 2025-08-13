'use client';
import { FC, useState, useTransition } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchema } from '@/schemas/auth';
import { reset } from '@/actions/auth/reset';

import { AuthWrapper } from './AuthWrapper';

interface ResetFormProps {
  className?: string;
}

const ResetForm: FC<ResetFormProps> = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: { email: string }) => {
    setError('');
    setSuccess('');


    startTransition(() => {
      reset(values).then((data: { error?: string; success?: string }) => {
        if (data.error) {
          setError(data.error);
          setSuccess('');
        } else if (data.success) {
          setSuccess(data.success);

          setError('');
        }
      });
    });
  };

  return (
    <AuthWrapper
      headerLabel='Forgot your password?'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Send reset email
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default ResetForm;
