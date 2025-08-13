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
import { NewQuestionSchema, NewQuestionSchemaType } from '@/schemas/dashboard';
import { newQuestion } from '@/actions/dashboard/question';

interface QuestionFormProps {
  className?: string;
  groupId: string;
}

const QuestionForm: FC<QuestionFormProps> = ({ groupId }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewQuestionSchemaType>({
    resolver: zodResolver(NewQuestionSchema),
    defaultValues: {
      text: '',
      type: 'MCQ',
      score: '',
    },
  });

  const onSubmit = (value: NewQuestionSchemaType) => {

  
    // handle submit logic
    startTransition(() => {
      newQuestion(value, groupId)
        .then(data => {
          if (data.error) {
            setError(data.error);
            setSuccess('');
          } else if (data.success) {
            setSuccess(data.success);
            form.reset();
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
      actionBtn={'Create Question'}
      headerLabel={'Create Question for Candidates'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
                      onValueChange={field.onChange}
                      disabled={isPending}
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
            Create Question
          </Button>
        </form>
      </Form>
    </QuizFieldsWrapper>
  );
};

export default QuestionForm;
