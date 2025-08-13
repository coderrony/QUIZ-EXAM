'use server';
import { getUserById } from '@/data-query/user';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import {
  AssignedTestSchema,
  AssignedTestSchemaSchemaType,
  SetupQuizSchema,
  SetupQuizSchemaType,
} from '@/schemas/dashboard';
import { revalidatePath } from 'next/cache';
import { sendQuizExamEmail } from '@/lib/mail';

export async function createQuizByTestWithQuestions(
  value: SetupQuizSchemaType,
) {
  const validatedFields = SetupQuizSchema.safeParse(value);
 
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  try {
    const { testId, questionIds } = validatedFields.data;

   
    const existing = await prisma.testQuestion.findMany({
      where: {
        testId,
        questionId: { in: questionIds }
      },
      select: { questionId: true }
    });

    const existingIds = new Set(existing.map(e => e.questionId));


    const newData = questionIds
      .filter(qId => !existingIds.has(qId))
      .map((qId, index) => ({
        testId,
        questionId: qId,
        order: index + 1, // order starts from 1
      }));

 
    if (newData.length > 0) {
      await prisma.testQuestion.createMany({ data: newData });
    }

    revalidatePath(`/dashboard/setup-quiz`);
    return { success: `Test updated with ${newData.length} new questions.` };
  } catch (error) {
  
    if (error instanceof Error) {
       return { error: 'Something is wrong!' };
    }
    return { error: 'Something went wrong!' };
  }
}

export async function testAssigned(value: AssignedTestSchemaSchemaType) {
  const token = uuidv4();

  const validatedFields = AssignedTestSchema.safeParse(value);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  try {
    const { userId, testId } = validatedFields.data;
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return { error: 'Email not found!' };
    }

    await prisma.assignedTest.create({
      data: { userId, testId, loginToken: token, credentialsSent: true },
    });

    revalidatePath(`/dashboard/candidates`);

    const res = await sendQuizExamEmail(existingUser.email, token);

    if (res.success) {
      return { success: 'Test assigned  and exam email sent!' };
    } else {
      return { error: 'Could not send exam email.' };
    }
  } catch (error) {
    if (error instanceof Error) {
       return { error: 'Something is wrong!' };
    }
    return { error: 'Something went wrong!' };
  }
}
