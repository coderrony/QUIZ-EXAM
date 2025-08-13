'use client';

import { FC, useState, useTransition } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { createUserAnswer } from '@/actions/dashboard/test-start';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { QuestionType } from '@/types/dashboardTypes';

interface QuestionBoxProps {
  className?: string;
  quiz: QuestionType;
  index: number;
  userTestSessionId: string | null;
  timeFinished: boolean;
}

const QuestionBox: FC<QuestionBoxProps> = ({
  quiz,
  index,
  userTestSessionId,
  timeFinished,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = () => {
    if (!userTestSessionId || !selectedAnswer) {
      setError('Please  give your answer.');
      return;
    }
    startTransition(() => {
      createUserAnswer(userTestSessionId!, quiz.id, selectedAnswer!,quiz.score,quiz.type,quiz?.correct)
        .then(data => {
    
          if (data?.error) {
            setSuccess('');
            setError(data.error);
          }
          if (data?.success) {
            setError('');
            setSuccess(data.success);
          }
        })
        .catch(err => {
          setError(`Something went wrong: ${err.message} `);
        })
        .finally(() => {
          // setSelectedAnswer('');
        });
    });
  };

  return (
    <Card className={isPending ? 'opacity-60 pointer-events-none' : ''}>
      <CardContent className='space-y-4'>
        <h6 className='font-bold'>
          {index}. {quiz.text}
        </h6>

        {quiz.type === 'MCQ' ? (
          <RadioGroup
            onValueChange={handleAnswerChange}
            disabled={isPending || timeFinished}
          >
            {quiz.choices.map(choice => (
              <div key={choice.id} className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={String(choice.index)}
                  id={choice.id}
                  disabled={isPending || timeFinished}
                />
                <label htmlFor={choice.id}>{choice.text}</label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <Textarea
            disabled={isPending || timeFinished}
            placeholder='Write your answer here...'
            value={selectedAnswer || ''}
            onChange={e => handleAnswerChange(e.target.value)}
          />
        )}

        <Button
          onClick={handleSubmit}
          className='mt-4'
          disabled={isPending || timeFinished}
        >
          Submit
        </Button>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </CardContent>
    </Card>
  );
};

export default QuestionBox;
