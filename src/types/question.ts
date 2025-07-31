// types/question.ts

// import { Prisma } from "@prisma/client";
// import {prisma} from "@/lib/prisma"

// export type ChoiceType = {
//   id: string
//   text: string
//   questionId: string
//   index: number
// }

// export type QuestionType = {
//   id: string
//   groupId: string
//   text: string
//   type: 'MCQ' | string
//   score: number
//   correct: string | null
//   choices: ChoiceType[]
// }


import { Prisma } from '@prisma/client'

export type QuestionType= Prisma.QuestionGetPayload<{
    include: { choices: true }
  }>