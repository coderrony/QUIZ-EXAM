import { FC } from 'react';
import { ShieldAlert } from "lucide-react";

interface FormErrorProps {
  className?: string;
  message: string;
}

const FormError: FC<FormErrorProps> = ({message}) => {
  if(!message) return null
  return (
 <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ShieldAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;