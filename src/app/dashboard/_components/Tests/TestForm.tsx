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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewTestSchema, NewTestSchemaType } from '@/schemas/dashboard';
import { newTest } from '@/actions/dashboard/test';
import useMySession from '@/hooks/useSession';
import { MySessionType } from '@/providers/SessionProvider';

interface TestFormProps {
  className?: string;
}

const TestForm: FC<TestFormProps> = () => {
  const session = useMySession() as MySessionType
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  //  console.log('Navbar mySession ', session);

  const form = useForm<NewTestSchemaType>({
    resolver: zodResolver(NewTestSchema),
    defaultValues: {
      name: '',
      position: '',
      durationMin: '',
    },
  });

  const onSubmit = (value: NewTestSchemaType) => {
    console.log(value);
    startTransition(() => {
      newTest(value,session.user.id).then(data => {
        if (data.error) {
          setError(data.error);
          setSuccess('');
        } else if (data.success) {
          setSuccess(data.success);
          form.reset()
          setError('');
        }
      });
    });
  };

  return (
    <QuizFieldsWrapper
      actionBtn={'Create TEST'}
      headerLabel={'Create Test for Candidates'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Test Name
                    <span className='text-xs'>{`(e.g., Frontend Round 1,Agriculture Exam finial Round,Junior Node Developer Round 2)`}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='Frontend Round 1'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Position
                    <span className='text-xs'>{`(e.g.,Frontend Intern,Agriculture Exam,Junior Node Developer)`}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='Frontend Intern'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='durationMin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Duration
                    <span className='text-xs'>
                      {`(Enter duration in minutes, e.g., 30 = 30 minutes, 90 = 1.5 hours)`}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='30'
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
            Create Test
          </Button>
        </form>
      </Form>
    </QuizFieldsWrapper>
  );
};

export default TestForm;
