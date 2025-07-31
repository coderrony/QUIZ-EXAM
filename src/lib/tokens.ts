'use server';
import { v4 as uuidv4 } from 'uuid';


import { prisma } from './prisma';
import { getVerificationTokenByEmail } from '@/data-query/verification-token';
import { getPasswordResetTokenByEmail } from '@/data-query/password-reset-token';

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Set expiration time to 1 hour (3600 seconds) from the current time

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000); // Set expiration time to 1 hour (3600 seconds) from the current time

  console.log('generateVerificationToken token ', token);
  console.log('generateVerificationToken expires ', expires);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
