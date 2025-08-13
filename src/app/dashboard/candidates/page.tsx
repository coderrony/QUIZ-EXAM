import AssignQuiz from '../_components/Candidates/AssignQuiz';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { getTestByUserID } from '@/data-query/dashboard';
import { MySessionType } from '@/providers/SessionProvider';
import { FileQuestionMarkIcon, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import InfoBox from '../_components/InfoBox';
import { formatDate } from '@/utils/dateFormat';
import Image from 'next/image';

type AssignedTestsType = {
  id: string;
  userId: string;
  testId: string;
  loginToken: string | null;
  assignedAt: Date;
  credentialsSent: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

async function CandidatesPage() {
  const session = (await auth()) as MySessionType;
  if (!session) return notFound();

  const totalTests = await getTestByUserID(session.user.id);

  const tests = totalTests.reduce(
    (acc: { id: string; name: string }[], test) => {
      if (test.testQuestions.length > 0) {
        acc.push({
          id: test.id,
          name: test.name,
        });
      }
      return acc;
    },
    [],
  );

  const candidateCard = (
    assignData: AssignedTestsType,
    testData: { name: string; position: string; durationMin: number },
  ) => {
  

    return (
      <Card
        key={assignData.id}
        className='group border border-border rounded-2xl transition-all hover:scale-[1.01] hover:border-primary/60 hover:shadow-xl hover:bg-gradient-to-br hover:from-primary/10 hover:to-background bg-white dark:bg-muted/60'
      >
        <CardContent className='p-6 flex flex-col gap-4'>
          <div className='flex flex-col  gap-4'>
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <h3 className='text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors'>
                  {testData.name}
                </h3>
                {assignData.credentialsSent && (
                  <span className='px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 group-hover:bg-green-200 font-medium'>
                    Credentials Sent
                  </span>
                )}
              </div>
              <p className='text-sm text-muted-foreground'>
                <span className='font-medium'>Position:</span>{' '}
                {testData.position}
              </p>
            </div>
            <InfoBox
              icon={<Timer className='w-5 h-5 text-primary' />}
              label='Duration'
              value={`${testData.durationMin} min`}
            />
          </div>
          <div className='flex items-center gap-4 mt-2'>
            <div className='flex-shrink-0'>
              {assignData.user.image ? (
                <Image
                  src={assignData.user.image}
                  alt='User Image'
                  width={40}
                  height={40}
                  className='w-10 h-10 rounded-full object-cover border border-border shadow'
                />
              ) : (
                <div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-lg font-bold border border-border'>
                  {assignData.user.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
            </div>
            <div className='flex flex-col gap-0.5'>
              <div className='font-medium text-foreground'>
                {assignData.user.name}
              </div>
              <div className='text-xs text-muted-foreground break-all'>
                {assignData.user.email}
              </div>
              <div className='text-xs text-muted-foreground'>
                <span className='font-medium'>Assigned:</span>{' '}
                {formatDate(assignData.assignedAt)}
              </div>
              {assignData.user?.emailVerified && (
                <div className='text-xs text-green-700'>
                  <span className='font-medium'>Email Verified:</span>{' '}
                  {formatDate(assignData.user.emailVerified)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className='pt-0'>
          <Link href={`/dashboard/candidates/${assignData.user.id}`}    className="flex bg-blue-500 items-center gap-2 px-5 py-2 rounded-md font-semibold shadow-sm transition-colors cursor-pointer"
       >
            View Exam
          </Link>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className='space-y-8 mx-2 sm:mx-4 md:mx-10 py-6 md:py-10'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
        <div>
          <h1 className='text-2xl md:text-3xl font-extrabold text-foreground mb-2'>
            Candidates
          </h1>
          <p className='text-base md:text-lg text-muted-foreground'>
            Manage candidates for your quizzes and view their progress.
          </p>
        </div>
        {tests.length > 0 && <AssignQuiz tests={tests} />}
      </div>

      {totalTests.length > 0 && (
        <Suspense fallback={<LoadingIndicator />}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {totalTests.map(
              test =>
                test.assignedTests.length > 0 &&
                test.assignedTests.map(assignData =>
                  candidateCard(assignData, {
                    name: test.name,
                    position: test.position,
                    durationMin: test.durationMin,
                  }),
                ),
            )}
          </div>
        </Suspense>
      )}

      {tests.length === 0 && (
        <div className='flex flex-col items-center justify-center py-16 bg-background rounded-lg shadow-sm border'>
          <FileQuestionMarkIcon className='mb-6 w-12 h-12 text-primary' />
          <p className='text-xl font-medium text-muted-foreground mb-4 text-center'>
            You can&#39;t assign quizzes because you haven&#39;t set up any
            quizzes yet.
          </p>
          <Link href='/dashboard/setup-quiz'>
            <Button
              variant='default'
              className='font-semibold px-6 py-2 cursor-pointer'
            >
              Go Setup Quiz
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CandidatesPage;
