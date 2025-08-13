import { getAssignTestByToken } from '@/data-query/dashboard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StartTest from './_components/StartTest';
import { auth } from '@/auth';

type MyTestPageProps = {
  searchParams: Promise<{ token: string }>;
};

async function MyTestPage(props: MyTestPageProps) {
  const session = await auth()
  const { token } = await props.searchParams;
  const examQuiz = await getAssignTestByToken(token);

  if (!examQuiz || !session) return notFound();



  return (
    <div className='flex justify-center items-center min-h-screen bg-muted'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl'>Ready to Start Your Test?</CardTitle>
     
        </CardHeader>
        <CardContent>
          <div className='mb-6 space-y-1 text-sm'>
            <div>
              <span className='font-semibold'>Test Name:</span>{' '}
              {examQuiz.test.name}
            </div>
            <div>
              <span className='font-semibold'>Position:</span>{' '}
              {examQuiz.test.position}
            </div>
            <div>
              <span className='font-semibold'>Date:</span>{' '}
              {new Date(examQuiz.test.date).toLocaleString()}
            </div>
            <div>
              <span className='font-semibold'>Duration:</span>{' '}
              {examQuiz.test.durationMin} minutes
            </div>
          </div>
          <div className='mb-6 text-sm text-muted-foreground'>
            <p>
              By continuing, you confirm you are ready to begin the test. Please
              ensure you have a stable internet connection and enough time to
              complete the test in one sitting.
            </p>
          </div>
          <div className='flex gap-3'>
            {/* <Button type='submit' className='font-semibold'>
              Yes, I&#39;m Ready
            </Button> */}
            <StartTest  testInfo={examQuiz.test} userId={session!.user!.id ?? ""} />

            <Button variant='outline' type='button' asChild>
              <Link href={'/'}>Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyTestPage;
