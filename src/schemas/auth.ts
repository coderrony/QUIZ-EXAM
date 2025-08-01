import * as z from 'zod';

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Minimum of 6 characters required',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // error will show under confirmPassword field
  });

export const ResetSchema = z.object({
  email: z.email({
    message: 'Email is required',
  }),
});

export const LoginSchema = z.object({
  email: z.email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const RegisterSchema = z
  .object({
    email: z.email({
      message: 'Email is required',
    }),
    password: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
    name: z.string().min(1, {
      message: 'Name is required',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // error will show under confirmPassword field
  });
