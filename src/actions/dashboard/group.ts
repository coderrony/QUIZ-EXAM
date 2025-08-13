'use server';

import { prisma } from '@/lib/prisma';
import { NewGroupSchema, NewGroupSchemaType } from '@/schemas/dashboard';
import { revalidatePath } from 'next/cache';

export const newGroup = async (value: NewGroupSchemaType, testId: string) => {
  const validatedFields = NewGroupSchema.safeParse(value);
  try {
    if (testId.length === 0) {
      return { error: 'Test not found!' };
    }

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }

    const { name } = validatedFields.data;

    await prisma.group.create({
      data: { name, testId },
    });
    revalidatePath(`/dashboard/tests/${testId}`);
    return { success: 'New Group added' };
  } catch (error) {
    if (error instanceof Error) {
     return { error: 'Something is wrong!' };
    }
    return { error: 'Something is wrong!' };
  }
};

export const getGroupByID = async (groupId: string) => {
  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        questions: {
          orderBy: { createdAt: 'asc' },
          include: {
            choices: {
              orderBy: { index: 'asc' },
            },
          },
        },
      },
    });

    return group;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong!');
  }
};
