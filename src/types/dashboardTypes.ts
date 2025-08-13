import { Prisma } from '@prisma/client';

export type QuestionType = Prisma.QuestionGetPayload<{
  include: { choices: true };
}>;

export type TestType = Prisma.TestGetPayload<{
  include: { testQuestions: {
    include: { question: true };
  } };
}>;
