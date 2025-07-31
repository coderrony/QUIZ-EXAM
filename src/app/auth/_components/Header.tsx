// import { cn } from '@/lib/utils';
import { FC } from 'react';

interface HeaderProps {
  className?: string;
  label:string
}

const Header: FC<HeaderProps> = ({label}) => {
  return (
  <div className="w-full flex flex-col gap-y-4 items-center justify-center">
    <div className='flex items-center space-x-3'>
        <span className='text-2xl font-bold text-blue-600'>
          QuizExam
        </span>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;