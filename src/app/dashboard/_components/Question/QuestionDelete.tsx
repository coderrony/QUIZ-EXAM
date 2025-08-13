'use client';
import { questionDelete } from '@/actions/dashboard/question';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from 'lucide-react';
import { FC, useState, useTransition } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface QuestionDeleteProps {
  className?: string;
  questionId: string;
}

const QuestionDelete: FC<QuestionDeleteProps> = ({ questionId }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(() => {
      questionDelete(questionId);
    });

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className='w-full bg-red-400 text-white hover:text-black cursor-pointer'
          disabled={isPending}
        >
          <DeleteIcon /> Delete Question
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64 flex flex-col items-center gap-4'>
        <div className='text-center'>
          Are you sure you want to delete this question?
        </div>
        <div className='flex gap-2'>
          <Button
            className='bg-red-500 text-white hover:bg-red-600'
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Yes, Delete'}
          </Button>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuestionDelete;
