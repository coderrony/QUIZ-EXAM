'use client';
import { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface QuizFieldsWrapperProps {
  className?: string;
  children: ReactNode;
  actionBtn: string;
  headerLabel: string;
  isIcon?:ReactNode;
}

const QuizFieldsWrapper: FC<QuizFieldsWrapperProps> = ({
  children,
  actionBtn,
  headerLabel,
  className,
  isIcon
}) => {
  return (
    <Dialog >
      <DialogTrigger className={className}>
        <Button className='cursor-pointer'>
          {isIcon ?  isIcon  : <Plus className='w-2 h-2 mr-1' /> }
        
          {actionBtn || 'ADD'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg md:max-w-2xl lg:max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='text-center my-5'>{headerLabel}</DialogTitle>
          <DialogDescription >
            <div>
              {children}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuizFieldsWrapper;
