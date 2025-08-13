'use client';

import { FC, useState, useTransition } from 'react';
import QuizFieldsWrapper from '../QuizFieldsWrapper';

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
import { SetupQuizSchema, SetupQuizSchemaType } from '@/schemas/dashboard';
import MultiSelect from './MultiSelect';
import { createQuizByTestWithQuestions } from '@/actions/dashboard/setup-quiz';

interface SetupQuizFormProps {
  className?: string;
  tests: { id: string; name: string }[];
  questions: { id: string; text: string }[];
}

const SetupQuizForm: FC<SetupQuizFormProps> = ({ tests, questions }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<SetupQuizSchemaType>({
    resolver: zodResolver(SetupQuizSchema),
    defaultValues: {
      testId: '',
      questionIds: [],
    },
  });

  const onSubmit = (value: SetupQuizSchemaType) => {

    // handle submit logic
    startTransition(() => {
      createQuizByTestWithQuestions(value)
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
      actionBtn={'Quiz Setup'}
      headerLabel={'Setup Quiz for Candidates'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='testId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Test</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Test' />
                      </SelectTrigger>
                      <SelectContent>
                        {tests.map(test => (
                          <SelectItem key={test.id} value={test.id}>
                            {test.name}
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
              name='questionIds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Questions</FormLabel>
                  <FormControl>
                    <MultiSelect
                      label='Questions'
                      options={questions}
                      values={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
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
            Setup Quiz
          </Button>
        </form>
      </Form>
    </QuizFieldsWrapper>
  );
};

export default SetupQuizForm;
