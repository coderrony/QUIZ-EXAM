'use server';
import {
  EditQuestionSchema,
  EditQuestionSchemaType,
  NewChoiceSchema,
  NewChoiceSchemaType,
  NewQuestionSchema,
  NewQuestionSchemaType,
} from '@/schemas/dashboard';
import { getGroupByID } from './group';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const newQuestion = async (
  value: NewQuestionSchemaType,
  groupId: string,
) => {
  const validatedFields = NewQuestionSchema.safeParse(value);
  try {
    const existingGroup = await getGroupByID(groupId);

    if (!existingGroup) {
      return { error: 'Group not found!' };
    }

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }

    const { text, type, score } = validatedFields.data;

    await prisma.question.create({
      data: { text, type, groupId, score: Number(score) },
    });
    revalidatePath(`/dashboard/tests`);
    return { success: 'New Question added' };
  } catch (error) {
    if (error instanceof Error) {
    return { error: 'Something is wrong!' };
    }
    return { error: 'Something is wrong!' };
  }
};

export const newChoice = async (
  value: NewChoiceSchemaType,
  questionId: string,
) => {
  const validatedFields = NewChoiceSchema.safeParse(value);
  try {
    const existingQuestion = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!existingQuestion) {
      return { error: 'Question not found!' };
    }

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }

    const { text, index } = validatedFields.data;

    await prisma.choice.create({
      data: { text, questionId, index: Number(index) },
    });
    revalidatePath(`/dashboard/tests`);
    return { success: 'New Choice added' };
  } catch (error) {
    if (error instanceof Error) {
      return { error: 'Something is wrong!' };
    }
    return { error: 'Something is wrong!' };
  }
};

export const editQuestion = async (
  value: EditQuestionSchemaType,
  questionId: string,
) => {
  const validatedFields = EditQuestionSchema.safeParse(value);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  try {
    const { text, correctAnswer, type, score } = validatedFields.data;

    await prisma.question.update({
      where: { id: questionId },
      data: { correct: correctAnswer, text, type, score: Number(score) },
    });

    revalidatePath(`/dashboard/tests`);
    return { success: 'Update Question' };
  } catch (error) {
    if (error instanceof Error) {
       return { error: 'Something is wrong!' };
    }
    return { error: 'Something is wrong!' };
  }
};

export const questionDelete = async (questionId: string) => {
  console.log("questionId ",questionId);
  
  try {
    const existingQuestion = await prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!existingQuestion) {
      return { error: 'Question not found!' };
    }
    await prisma.question.delete({
      where: { id: questionId },
    });
    revalidatePath(`/dashboard/tests`);
    return { success: 'Question Deleted' };
  } catch (error) {
    if (error instanceof Error) {
       return { error: 'Something is wrong!' };
    }
    return { error: 'Something is wrong!' };
  }
};
