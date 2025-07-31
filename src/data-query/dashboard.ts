import { prisma } from '@/lib/prisma';

export const getTestByUserID = async (userId: string) => {
  return await prisma.test.findMany({
    where: { userId },
    include: {
      groups: {
        include: {
          questions: true,
        },
      },
      assignedTests: true,
      testSessions: true,
      testQuestions: true,
    },
  });
};
