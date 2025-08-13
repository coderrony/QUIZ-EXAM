'use client';
import { FC, useState, useTransition } from 'react';
import QuizFieldsWrapper from '../QuizFieldsWrapper';
import { Input } from '@/components/ui/input';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditQuestionSchema,
  EditQuestionSchemaType,
} from '@/schemas/dashboard';
import { editQuestion } from '@/actions/dashboard/question';


import { Edit } from 'lucide-react';
import { QuestionType } from '@/types/dashboardTypes';

interface EditQuestionProps {
  className?: string;
  question: QuestionType;
}

const EditQuestion: FC<EditQuestionProps> = ({ question }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();



  const form = useForm<EditQuestionSchemaType>({
    resolver: zodResolver(EditQuestionSchema),
    defaultValues: {
      text: question.text,
      type: question.type,
      score: String(question.score),
      correctAnswer: question.correct === null ? null : question.correct,
    },
  });

  const onSubmit = (value: EditQuestionSchemaType) => {
 
    // handle submit logic
    startTransition(() => {
      editQuestion(value, question.id)
        .then(data => {
          if (data.error) {
            setError(data.error);
            setSuccess('');
          } else if (data.success) {
            setSuccess(data.success);
            // form.reset();
            setError('');
          }
        })
        .finally(() => {
          setTimeout(() => {
            setSuccess('');
            setError('');
          }, 3000);
        });
    });
  };

  return (
    <QuizFieldsWrapper
      actionBtn={'Edit Question'}
      headerLabel={`EDIT:  ${question.text}`}
      isIcon={<Edit className='w-2 h-2 mr-1' />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='correctAnswer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
                  <FormControl>
                    <Select
                      value={
                        field.value === null || field.value === undefined
                          ? 'null'
                          : String(field.value)
                      }
                      onValueChange={val => {
                        if (val === 'null') {
                          field.onChange(null);
                        } else {
                          field.onChange(Number(val));
                        }
                      }}
                      disabled={isPending}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Answer' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='null'>Select Answer</SelectItem>
                        {question.choices.map(item => (
                          <SelectItem key={item.id} value={String(item.index)}>
                            {item.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='text'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Question Text
                    <span className='text-xs ml-1'>(min 4 characters)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='Enter question text'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Question Type
                    <span className='text-xs ml-1'>(MCQ or TEXT)</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      // onValueChange={field.onChange}
                      disabled={true}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='TEXT'>TEXT</SelectItem>
                        <SelectItem value='MCQ'>MCQ</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='score'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Score
                    <span className='text-xs ml-1'>(e.g., 5)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='Enter score'
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            EDIT Question
          </Button>
        </form>
      </Form>
    </QuizFieldsWrapper>
  );
};

export default EditQuestion;
