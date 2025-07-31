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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas/auth';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { Eye } from 'lucide-react';
import { register } from '@/actions/auth/register';

import { AuthWrapper } from './AuthWrapper';

interface RegisterFormProps {
  className?: string;
}

export type RegisterFormType = z.infer<typeof RegisterSchema>;

const RegisterForm: FC<RegisterFormProps> = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  });

  const onSubmit = (values: RegisterFormType) => {
    setError('');
    setSuccess('');

    console.log('values ', values);

    startTransition(() => {
      register(values).then((data: { error?: string; success?: string }) => {
      if (data.error) {
        setError(data.error);
        setSuccess('');
      } else if (data.success) {
        setSuccess(data.success);
        form.reset()
        setError('');
      }
      });
    });
  };

  return (
    <AuthWrapper
      headerLabel='Create an account'
      backButtonLabel='Already have an account?'
      backButtonHref='/auth/login'
      showSocial
    >
 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='John Doe'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                      />
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={(()=>setShowPassword((prev)=> !prev))} />
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
                <FormItem className="relative">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                        
                      />
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={(()=>setShowPassword((prev)=> !prev))} />
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
            Create an account
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default RegisterForm;
