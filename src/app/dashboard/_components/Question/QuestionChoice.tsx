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

import { NewChoiceSchema, NewChoiceSchemaType } from '@/schemas/dashboard';
import { newChoice } from '@/actions/dashboard/question';

interface QuestionChoiceProps {
  className?: string;
  questionId: string;
  question: string;
  selectedIndex: number[];
}

const QuestionChoice: FC<QuestionChoiceProps> = ({
  questionId,
  question,
  selectedIndex,
}) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewChoiceSchemaType>({
    resolver: zodResolver(NewChoiceSchema),
    defaultValues: {
      text: '',
      index: '',
    },
  });

  const onSubmit = (value: NewChoiceSchemaType) => {
    console.log(value);
    if (selectedIndex.includes(Number(value.index))) {
      form.setError('index', {
        type: 'manual',
        message: `Index ${value.index} is already selected for another choice.`,
      });
      return;
    }

    // handle submit logic
    startTransition(() => {
      newChoice(value, questionId)
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
      className='text-xs '
      actionBtn={'Create Choice'}
      headerLabel={question}
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
                    Choice Text
                    <span className='text-xs ml-1'>(min 4 characters)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='Enter choice text'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='index'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Choice Index
                    <span className='text-xs ml-1'>(1 | 2 | 3 | 4 )</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Index' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='2'>2</SelectItem>
                        <SelectItem value='3'>3</SelectItem>
                        <SelectItem value='4'>4</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Create Choice
          </Button>
        </form>
      </Form>
    </QuizFieldsWrapper>
  );
};

export default QuestionChoice;
