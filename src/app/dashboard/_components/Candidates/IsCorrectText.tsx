"use client";
import { updateTextAnswer } from '@/actions/dashboard/test-start';
import { Button } from '@/components/ui/button';
import { FC, useState, useTransition } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface IsCorrectTextProps {
  className?: string;
  answerId: string;
  questionScore: number;
}

const IsCorrectText: FC<IsCorrectTextProps> = ({
  className,
  answerId,
  questionScore,
}) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleTextAnswer = () => {
    setError('');
    setSuccess('');
    startTransition(() => {
      updateTextAnswer(answerId, questionScore).then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className={`flex flex-col items-start gap-2 ${className || ''}`}>
      <Button
        disabled={isPending}
        onClick={handleTextAnswer}
        className="flex items-center gap-2 px-5 py-2 rounded-md font-semibold shadow-sm transition-colors cursor-pointer"
        variant={success ? "default" : "destructive"}
      >
        {isPending && <Loader2 className="animate-spin w-4 h-4" />}
        {!isPending && success && <CheckCircle2 className="w-4 h-4 text-green-600" />}
        {!isPending && error && <XCircle className="w-4 h-4 text-red-600" />}
        {isPending
          ? "Submitting..."
          : error
          ? error
          : success
          ? success
          : "Mark as Correct"}
      </Button>
      {/* Optionally show messages below the button */}
      {!isPending && (error || success) && (
        <span
          className={`text-sm ${
            error ? 'text-red-600' : 'text-green-600'
          } font-medium`}
        >
          {error || success}
        </span>
      )}
    </div>
  );
};

export default IsCorrectText;