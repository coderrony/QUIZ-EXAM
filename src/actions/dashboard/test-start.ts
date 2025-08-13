'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const startTestSession = async (userId: string, testId: string) => {
  if (!userId || !testId) {
    return { error: 'Something is wrong!' };
  }
  try {
    const alreadySubmitted = await prisma.userTestSession.findFirst({
      where: { userId, testId, submitted: true },
    });

    if (alreadySubmitted) {
      return { error: 'You have already submitted this Test' };
    }

    const testSession = await prisma.userTestSession.create({
      data: {
        userId,
        testId,
        startedAt: new Date(),
      },
    });

    return { success: 'Test started successfully', testSession };
  } catch (error) {
    if (error instanceof Error) {
      return { error: 'Something is Wrong try again later' };
    }
    return { error: 'Something went wrong while starting the test' };
  }
};

export const endTestSession = async (testSessionId: string | null) => {
  if (!testSessionId) {
    return { error: 'Test session ID is required' };
  }
  try {
    const existingUserTestSession = await prisma.userTestSession.findUnique({
      where: { id: testSessionId },
    });

    if (!existingUserTestSession) {
      return { error: 'User Test not exists' };
    }

    if (existingUserTestSession.submitted) {
      return { error: 'Test already submitted' };
    }

    const updatedSession = await prisma.userTestSession.update({
      where: { id: testSessionId },
      data: { submitted: true, endedAt: new Date() },
    });

    return { success: 'Test ended successfully', testSession: updatedSession };
  } catch (error) {
    if (error instanceof Error) {
      return { error: 'Something is Wrong try again later' };
    }
    return { error: 'Something went wrong while ending the test' };
  }
};

export const createUserAnswer = async (
  testSessionId: string,
  questionId: string,
  response: string,
  score: number,
  questionType: string,
  correctAns?: number | null,
) => {
  try {
    const alreadyAnswered = await prisma.userAnswer.findFirst({
      where: { testSessionId, questionId },
    });
    if (alreadyAnswered) {
      return { error: 'You have already answered this question' };
    }
    let userAnswer;
    if (questionType === 'MCQ') {
      userAnswer = await prisma.userAnswer.create({
        data: {
          testSessionId,
          questionId,
          response,
          autoScore: Number(response) === correctAns ? score : 0,
        },
      });
    } else {
      userAnswer = await prisma.userAnswer.create({
        data: {
          testSessionId,
          questionId,
          response,
        },
      });
    }

    return { success: 'Question answer submitted successfully', userAnswer };
  } catch (error) {
    if (error instanceof Error) {
      return { error: 'Something is Wrong try again later' };
    }
    return { error: 'Something went wrong while creating user answer' };
  }
};

export const updateTextAnswer = async (answerId: string, questionScore: number) => {
  try {
   
    const findAnswer = await prisma.userAnswer.findUnique({
      where: { id: answerId },
    });

    if (!findAnswer) {
      return { error: 'That answer does not exist' };
    }

    const updatedAnswer = await prisma.userAnswer.update({
      where: { id: answerId },
      data: {
        givenScore: questionScore,
        autoScore:questionScore
      },
    });
    revalidatePath("/dashboard/candidates")
    return { success: "update mark", data: updatedAnswer };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message || 'Something is wrong, try again later' };
    }
    return { error: 'Something went wrong while updating user answer' };
  }
};


export const updateUserTestSession = async (userTestSessionId:string,totalScore:number) => {
  try {
   
    const findUserTestSession = await prisma.userTestSession.findUnique({
      where: { id: userTestSessionId },
    });

    if (!findUserTestSession) {
      return { error: 'That Test Session does not exist' };
    }

    await prisma.userTestSession.update({
      where: { id: userTestSessionId },
      data: {
        totalScore,
      },
    });
    revalidatePath("/dashboard/candidates")
    return { success: "update test session" };
  } catch (error) {
    if (error instanceof Error) {
      return { error:  'Something is wrong, try again later' };
    }
    return { error: 'Something went wrong while updating user answer' };
  }
};