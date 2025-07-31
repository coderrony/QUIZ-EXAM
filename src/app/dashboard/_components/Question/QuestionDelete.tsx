'use client';
import { questionDelete } from '@/actions/dashboard/question';
import { Button } from '@/components/ui/button';
import { FC, useTransition } from 'react';

interface QuestionDeleteProps {
  className?: string;
  questionId: string;
}

const QuestionDelete: FC<QuestionDeleteProps> = ({ questionId }) => {
  const [isPending, startTransition] = useTransition();

  const deleteQuestion = () => {
    startTransition(() => {
      questionDelete(questionId);
    });
  };
  return (
    <Button
      className='w-full bg-red-400 text-white hover:text-black'
      disabled={isPending}
      onClick={deleteQuestion}
    >
      {isPending ? 'Deleting...' : 'Delete Question'}
    </Button>
  );
};

export default QuestionDelete;
