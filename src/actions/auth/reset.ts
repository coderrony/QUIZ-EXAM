'use server';

import { getUserByEmail } from '@/data-query/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

import { ResetSchema } from '@/schemas/auth';

export const reset = async (values: { email: string }) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  const res = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  if (res.success) {
    return { success: 'Reset email sent!' };
  } else {
    return { error: 'Could not send Reset email.' };
  }
};
