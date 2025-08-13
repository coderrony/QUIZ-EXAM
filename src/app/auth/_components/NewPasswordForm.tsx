'use client';
import { FC } from 'react';

import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewPasswordSchema } from '@/schemas/auth';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { Eye } from 'lucide-react';
import { newPassword } from '@/actions/auth/new-password';

import { AuthWrapper } from './AuthWrapper';

interface NewPasswordFormProps {
  className?: string;
}
export type resetNewPassType = z.infer<typeof NewPasswordSchema>;

const NewPasswordForm: FC<NewPasswordFormProps> = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: resetNewPassType) => {
    setError('');
    setSuccess('');

    console.log('values ', values);

    startTransition(() => {
      newPassword(values, token).then(data => {
        if (data.error) {
          setError(data.error);
          setSuccess('');
        } else if (data.success) {
          setSuccess(data.success);
          form.reset();
          setError('');
        }
      }).finally(() => {
          setTimeout(() => {
            setSuccess('');
            setError('');
          }, 3000);
        });
    });
  };

  return (
    <AuthWrapper
      headerLabel='Enter a new password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='******'
                        type={showPassword ? 'text' : 'password'}
                        className='pr-10'
                      />
                      <Eye
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
                        onClick={() => setShowPassword(prev => !prev)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='******'
                        type={showPassword ? 'text' : 'password'}
                        className='pr-10'
                      />
                      <Eye
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
                        onClick={() => setShowPassword(prev => !prev)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Reset password
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default NewPasswordForm;
