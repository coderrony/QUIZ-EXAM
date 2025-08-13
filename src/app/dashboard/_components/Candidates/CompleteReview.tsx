'use client';
import { updateUserTestSession } from '@/actions/dashboard/test-start';
import { Button } from '@/components/ui/button';
import { FC, useState, useTransition } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface CompleteReviewProps {
  className?: string;
  userTestSessionId: string;
  totalScore: number;
}

const CompleteReview: FC<CompleteReviewProps> = ({
  userTestSessionId,
  totalScore,
}) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleTextAnswer = () => {
    setError('');
    setSuccess('');
    startTransition(() => {
      updateUserTestSession(userTestSessionId, totalScore).then(data => {
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        disabled={isPending}
        onClick={handleTextAnswer}
        className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300
          ${success ? 'bg-green-600 hover:bg-green-700' : ''}
          ${error ? 'bg-red-600 hover:bg-red-700' : ''}
          ${!error && !success ? 'bg-blue-600 hover:bg-blue-700' : ''}
          disabled:opacity-70 disabled:cursor-not-allowed
        `}
      >
        {isPending && <Loader2 className="animate-spin w-5 h-5 text-white" />}
        {!isPending && success && <CheckCircle2 className="w-5 h-5 text-white" />}
        {!isPending && error && <XCircle className="w-5 h-5 text-white" />}
        <span className="text-white">
          {isPending
            ? 'Submitting...'
            : error
            ? error
            : success
            ? success
            : 'Finished Review'}
        </span>
      </Button>

      {!isPending && (error || success) && (
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            error ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {error || success}
        </span>
      )}
    </div>
  );
};

export default CompleteReview;
