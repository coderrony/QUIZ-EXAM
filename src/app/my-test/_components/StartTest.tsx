'use client';
import { FC, useEffect, useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { QuestionType, TestType } from '@/types/dashboardTypes';
import CountdownTimer from './CountdownTimer';
import {
  endTestSession,
  startTestSession,
} from '@/actions/dashboard/test-start';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import QuestionBox from './QuestionBox';

interface StartTestProps {
  className?: string;
  testInfo: TestType;
  userId: string;
}

const StartTest: FC<StartTestProps> = ({ testInfo, userId }) => {
  const [timeLeft, setTimeLeft] = useState(testInfo.durationMin * 60); // in seconds

  const [quizStart, setQuizStart] = useState(false); // in seconds

  const [userTestSessionId, setUserTestSessionId] = useState<null | string>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const quizQuestions = testInfo.testQuestions.map(
    question => question.question,
  ) as QuestionType[];

  useEffect(() => {
    if (timeLeft === 0) {
      handleDialogClose(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      // Prevent reload without warning
      event.preventDefault();
      event.returnValue = '';
      handleDialogClose(false);
    };

    const handleOffline = () => {
      console.warn('Network disconnected!');
      handleDialogClose(false);
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userTestSessionId]);

  const handleStartTest = () => {
    startTransition(() => {
      startTestSession(userId, testInfo.id)
        .then(data => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setUserTestSessionId(data.testSession.id);
            setQuizStart(true);
            // setSuccess(data.success);
          }
        })
        .catch(err => {
          setError(`Something went wrong: ${err.message} `);
        });
    });
  };

  const handleDialogClose = (isOpen: boolean) => {
    if (!userTestSessionId) return;

    if (!isOpen) {
      startTransition(() => {
        endTestSession(userTestSessionId)
          .then(data => {
            if (data?.error) {
              setError(data.error);
            }

            if (data?.success) {
              setSuccess(
                'Your test has been submitted. You will receive your results via email soon.',
              );
            }
          })
          .catch(err => {
            setError(`Something went wrong: ${err.message} `);
          });
      });
    }
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          className='flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg bg-primary  font-semibold shadow hover:bg-primary/90 transition'
          size='lg'
          onClick={handleStartTest}
          disabled={isPending}
        >
          <PlayCircle className='w-5 h-5' />
          Start Test
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-lg md:max-w-3xl lg:max-w-5xl'
        // showCloseButton={false}
      >
        {quizStart ? (
          <DialogHeader>
            <DialogTitle className='text-center text-2xl font-bold mb-2'>
              <h3>{testInfo.name}</h3>
              <h4>
                <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
              </h4>
            </DialogTitle>
            <div className='flex flex-col items-center mb-4'>
              <span className='text-muted-foreground text-sm'>
                Position:{' '}
                <span className='font-medium'>{testInfo.position}</span>
              </span>
              <span className='text-muted-foreground text-sm'>
                Duration:{' '}
                <span className='font-medium'>
                  {testInfo.durationMin} minutes
                </span>
              </span>
              <span className='text-muted-foreground text-sm'>
                Questions:{' '}
                <span className='font-medium'>
                  {testInfo.testQuestions.length}
                </span>
              </span>
            </div>
            <DialogDescription>
              <Carousel className='max-w-md md:max-w-lg mx-auto relative'>
                <div className='flex justify-center items-center gap-4 absolute left-1/2 -translate-x-1/2 top-5 z-10'>
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
                <CarouselContent className='mt-12'>
                  {quizQuestions.map((item, index) => (
                    <CarouselItem
                      key={item.id}
                      className='w-full px-2 sm:px-0 flex justify-center'
                    >
                      <div className='w-full '>
                        <QuestionBox
                          quiz={item}
                          index={index + 1}
                          userTestSessionId={userTestSessionId}
                          timeFinished={timeLeft === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className='text-center mt-4'>
                {/* <FormError message={error} /> */}
                <FormSuccess message={success} />
              </div>
            </DialogDescription>
          </DialogHeader>
        ) : (
          <div className='flex flex-col items-center justify-center py-8'>
            <h2 className='text-xl font-semibold mb-4 text-primary'>
              Wait for a moment
            </h2>
            <FormError message={error} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StartTest;
