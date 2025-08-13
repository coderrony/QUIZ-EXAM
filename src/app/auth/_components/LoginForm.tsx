'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { LoginSchema } from '@/schemas/auth';
import { login } from '@/actions/auth/login';
import { Eye } from 'lucide-react';

import { AuthWrapper } from './AuthWrapper';

export type LoginFormType = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') as string;

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormType) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values, callbackUrl)
        .then(data => {
          if (data?.error) {
            // form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(err => {
          console.log('err ', err);

          setError('Something went wrong');
        });
    });
  };

  return (
    <AuthWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
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
          </div>
          <Button size='sm' variant='link' asChild className='px-0 font-normal'>
            <Link href='/auth/reset'>Forgot password?</Link>
          </Button>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
