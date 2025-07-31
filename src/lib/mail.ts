'use server';
import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  console.log({ resetLink });

  try {
    const { data, error } = await resend.emails.send({
     from: 'quiz-exam@ronydas.dev',
      to: email,
      subject: 'Reset your password',
      react: EmailTemplate({
        title: 'Reset your password',
        message: 'Click the button below to reset your password.',
        action_url: resetLink,
        action_text: 'Reset Password',
      }),
    });

    console.log("sendPasswordResetEmail data ",data );
    console.log("sendPasswordResetEmail error ",error );

    if (error) {
      return { error: error };
    }

    return { success: data };
  } catch (error) {
    return { error: error };
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    console.log({ confirmLink });

    const { data, error } = await resend.emails.send({
      from: 'quiz-exam@ronydas.dev',
      to: email,
      subject: 'Confirm your email',
      react: EmailTemplate({
        title: 'Confirm your email',
        message:
          'Please confirm your email address to complete your registration.',
        action_url: confirmLink,
        action_text: 'Confirm Email',
      }),
    });

    console.log("sendVerificationEmail data ",data );
    console.log("sendVerificationEmail error ",error );
    

    if (error) {
      return { error: error };
    }

    return { success: data };
  } catch (error) {
    return { error: error };
  }
};
