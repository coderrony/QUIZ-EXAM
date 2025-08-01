'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

import { sendVerificationEmail } from '@/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { generateVerificationToken } from '@/lib/tokens';
import { LoginSchema } from '@/schemas/auth';
import { LoginFormType } from '@/app/auth/_components/LoginForm';
import { getUserByEmail } from '@/data-query/user';

export const login = async (values: LoginFormType, callbackUrl: string) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('auth/login error ', error);

      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
