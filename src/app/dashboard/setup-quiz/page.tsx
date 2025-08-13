import { auth } from '@/auth';
import SetupQuizForm from '../_components/SetupQuiz/SetupQuizForm';
import { notFound } from 'next/navigation';
import { getTestByUserID } from '@/data-query/dashboard';
import { MySessionType } from '@/providers/SessionProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
  Calendar,
  Edit,
  Eye,
  FileQuestionMarkIcon,
  MoreHorizontal,
  Timer,
  Trash2,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/utils/dateFormat';
import Link from 'next/link';

import { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import InfoBox from '../_components/InfoBox';

async function SetupQuizPage() {
  const session = (await auth()) as MySessionType;
  if (!session) return notFound();

  const totalTests = await getTestByUserID(session.user.id);

  const tests = totalTests.map(test => ({
    id: test.id,
    name: test.name,
  }));

  const questions = totalTests
    .map(test =>
      test.groups
        .map(group =>
          group.questions.map(item => ({
            id: item.id,
            text: item.text,
          })),
        )
        .flat(),
    )
    .flat();

  const testWithQuestions = totalTests.map(test => ({
    ...test,
    questions: test.testQuestions.map(q => q.question),
  }));

  return (
    <div className='space-y-8 mx-4 md:mx-10  py-8'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
        <div>
          <h1 className=' font-extrabold text-foreground mb-2'>Quiz Setup</h1>
          <p className='text-lg text-muted-foreground'>
            Create and manage quizzes for your candidates with ease.
          </p>
        </div>
        <SetupQuizForm tests={tests} questions={questions} />
      </div>

      <Suspense fallback={<LoadingIndicator />}>
        <div className='space-y-6'>
          {testWithQuestions.length > 0 ? (
            <div className='grid gap-6'>
              {testWithQuestions.map(
                test =>
                  test.questions.length > 0 && (
                    <Card
                      key={test.id}
                      className='group border border-border rounded-2xl shadow-sm transition-all hover:shadow-lg hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/5 hover:to-background'
                    >
                      <CardContent className='p-8'>
                        <div className='flex items-start justify-between mb-6'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-4 mb-2'>
                              <h3 className='text-2xl font-bold text-foreground group-hover:text-primary transition-colors'>
                                <Link href={`/dashboard/tests/${test.id}`}>
                                  {test.name}
                                </Link>
                              </h3>
                              <span className='px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 group-hover:bg-green-200 transition'>
                                Active
                              </span>
                            </div>
                            <p className='text-sm text-muted-foreground'>
                              <span className='font-medium'>Position:</span>{' '}
                              {test.position}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='icon'>
                                <MoreHorizontal className='w-6 h-6' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <Link
                                  href={`/dashboard/tests/${test.id}`}
                                  className='flex items-center gap-2'
                                >
                                  <Eye className='w-4 h-4 mr-2' />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className='w-4 h-4 mr-2' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className='text-destructive'>
                                <Trash2 className='w-4 h-4 mr-2' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
                          <InfoBox
                            icon={<Timer className='w-5 h-5 text-primary' />}
                            label='Duration'
                            value={`${test.durationMin} min`}
                          />

                          <InfoBox
                            icon={<Calendar className='w-5 h-5 text-primary' />}
                            label='Start Date'
                            value={formatDate(test.date)}
                          />
                        </div>

                        <div className='flex flex-col gap-4'>
                          <h4 className='text-lg font-semibold mb-2'>
                            Selected Questions
                          </h4>
                          {test.questions.length > 0 ? (
                            <div className='space-y-2'>
                              {test.questions.map(q => (
                                <div
                                  key={q.id}
                                  className='flex flex-col md:flex-row gap-2 md:items-center justify-between bg-muted/40 rounded-lg px-4 py-2'
                                >
                                  <Link
                                    href={`/dashboard/tests/${test.id}/group/${q.groupId}`}
                                    className='font-medium text-primary hover:underline'
                                  >
                                    {q.text}
                                  </Link>
                                  <div className='flex gap-4 text-sm text-muted-foreground'>
                                    <span>
                                      <FileQuestionMarkIcon className='inline w-4 h-4 mr-1' />
                                      Type: {q.type}
                                    </span>
                                    <span>
                                      Score:{' '}
                                      <span className='font-semibold'>
                                        {q.score}
                                      </span>
                                    </span>
                                    <span>
                                      Correct Index:{' '}
                                      <span className='font-semibold'>
                                        {q.correct}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className='text-muted-foreground'>
                              No questions selected.
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ),
              )}
            </div>
          ) : (
            <div className='text-center text-muted-foreground py-12'>
              <FileQuestionMarkIcon className='mx-auto mb-4 w-10 h-10 text-muted-foreground' />
              <p className='text-lg'>
                No tests available. Please create a test first.
              </p>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}

export default SetupQuizPage;
