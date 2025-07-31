import * as z from 'zod';

export const NewTestSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: 'Test Name is required',
    })
    .refine(val => val.length >= 6, {
      message: 'Test Name must be at least 6 characters long.',
    }),
  position: z
    .string()
    .min(6, {
      message: 'Position is required',
    })
    .refine(val => val.length >= 6, {
      message: 'Position must be at least 6 characters long.',
    }),
  durationMin: z
    .string()
    .min(1, { message: 'Duration is required' })
    .refine(val => Number(val) >= 10, {
      message: 'Duration must be at least 10 minute.',
    }),
});

export type NewTestSchemaType = z.infer<typeof NewTestSchema>;

export const NewGroupSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Group Name is required',
    })
    .refine(val => val.length >= 4, {
      message: 'Group Name must be at least 4 characters long.',
    }),
});

export type NewGroupSchemaType = z.infer<typeof NewGroupSchema>;

export const NewQuestionSchema = z.object({
  text: z
    .string()
    .min(4, {
      message: 'Text Name is required',
    })
    .refine(val => val.length >= 4, {
      message: 'Text Name must be at least 4 characters long.',
    }),
  type: z.enum(['MCQ', 'TEXT'], {
    message: 'Question type is required',
  }),
  score: z.string().min(1, { message: 'Score is required' }),
});

export type NewQuestionSchemaType = z.infer<typeof NewQuestionSchema>;

export const NewChoiceSchema = z.object({
  text: z
    .string()
    .min(1, {
      message: 'Choose Name is required',
    }),
  index: z.enum(['1','2','3','4','']).refine((val)=> val.length > 0,{ message: 'Index is required' }),
});

export type NewChoiceSchemaType = z.infer<typeof NewChoiceSchema>;

export const EditQuestionSchema = z.object({
  text: z
    .string()
    .min(4, {
      message: 'Text Name is required',
    })
    .refine(val => val.length >= 4, {
      message: 'Text Name must be at least 4 characters long.',
    }),
  correctAnswer:z.number().nullable().optional(),
  type: z.enum(['MCQ', 'TEXT'], {
    message: 'Question type is required',
  }),
  score: z.string().min(1, { message: 'Score is required' }),
});

export type EditQuestionSchemaType = z.infer<typeof EditQuestionSchema>;