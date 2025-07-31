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
import { NewGroupSchema, NewGroupSchemaType } from '@/schemas/dashboard';


import { newGroup } from '@/actions/dashboard/group';

interface GroupFormProps {
  className?: string;
  testId:string
}

const GroupForm: FC<GroupFormProps> = ({testId}) => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  //  console.log('Navbar mySession ', session);

  const form = useForm<NewGroupSchemaType>({
    resolver: zodResolver(NewGroupSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (value: NewGroupSchemaType) => {
    console.log(value);

    startTransition(() => {
      newGroup(value, testId).then(data => {
        if (data.error) {
          setError(data.error);
          setSuccess('');
        } else if (data.success) {
          setSuccess(data.success);
          form.reset();
          setError('');
        }
      }).finally(() => {
          setTimeout(() => {
            setSuccess('');
            setError('');
          }, 3000);
        });;
    });

  };

  return (
    <QuizFieldsWrapper
      actionBtn={'Create Group'}
      headerLabel={'Create a Group for Candidates'}
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
                    Group Name
                    <span className='text-xs'>{`(e.g., Javascript Basic Question,Agriculture Q.set ,Node.js Q.s)`}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='e.g, Javascript Basic Question'
                      type='text'
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
            Create Group
          </Button>
        </form>
      </Form>
    </QuizFieldsWrapper>
  );
};

export default GroupForm;
