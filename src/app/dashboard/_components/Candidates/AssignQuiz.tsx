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
  AssignedTestSchema,
  AssignedTestSchemaSchemaType,
} from '@/schemas/dashboard';

import useDebounce from '@/hooks/useDebounce';
import { userQueryByEmail } from '@/actions/auth/user';
import { testAssigned } from '@/actions/dashboard/setup-quiz';

interface AssignQuizProps {
  className?: string;
  tests: { id: string; name: string }[];
}

const AssignQuiz: FC<AssignQuizProps> = ({ tests }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const [matchedUsers, setMatchedUsers] = useState<
    { id: string; email: string }[]
  >([]);

  const query = useDebounce(async (value: string) => {
    const emails = await userQueryByEmail(value);

    if (emails.length > 0) {
      setMatchedUsers(emails);
    }
  }, 300);

  const form = useForm<AssignedTestSchemaSchemaType>({
    resolver: zodResolver(AssignedTestSchema),
    defaultValues: {
      userId: '',
      testId: '',
    },
  });

  const onSubmit = (value: AssignedTestSchemaSchemaType) => {

    setError('');
    if (value.userId?.length === 0) {
      setError('Please select a candidate from the matched list.');
      return;
    }
    // handle submit logic
    startTransition(() => {
      testAssigned(value)
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else if (data.success) {
            setSuccess(data.success);
            form.reset();
          }
        })
        .finally(() => {
          setTimeout(() => {
            setSuccess('');
            setError('');
            setMatchedUsers([]);
          }, 4000);
        });
    });
  };

  return (
    <QuizFieldsWrapper
      actionBtn={'Assign Quiz'}
      headerLabel={'Assign Quiz to Candidates'}
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
              name='searchBox'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search By Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      onChange={e => query(e.target.value)}
                      placeholder='Candidate Email'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {matchedUsers.length > 0 && (
              <Select
                onValueChange={val => {
                  form.setValue('userId', val);
                }}
                value={form.watch('userId')}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select user from matched list' />
                </SelectTrigger>
                <SelectContent>
                  {matchedUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Assign Quiz
          </Button>
        </form>
      </Form>
    </QuizFieldsWrapper>
  );
};

export default AssignQuiz;
