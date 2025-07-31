import { BadgeCheck } from 'lucide-react';
import { FC } from 'react';

interface FormSuccessProps {
  className?: string;
  message: string;
}

const FormSuccess: FC<FormSuccessProps> = ({message}) => {
   if (!message) return null;
  return (
     <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <BadgeCheck className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;