import {
  getTestQuestionByTestId,
  getUserTestSessionByUserId,
} from '@/data-query/dashboard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import Image from 'next/image';

import IsCorrectText from '../../_components/Candidates/IsCorrectText';
import CompleteReview from '../../_components/Candidates/CompleteReview';

type CandidateAnswerReviewType = {
  params: Promise<{ userId: string }>;
};

async function CandidateAnswerReview({ params }: CandidateAnswerReviewType) {
  const { userId } = await params;
  const getExam = await getUserTestSessionByUserId(userId);

  if (!getExam || getExam.userAnswers.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[40vh]'>
        <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-10 py-12 max-w-lg w-full text-center'>
          <h2 className='text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100'>
            No Exam Session Found
          </h2>
          <p className='mb-8 text-gray-600 dark:text-gray-300'>
            This candidate has not started or completed any exam yet.
          </p>
          <Link
            href='/dashboard/candidates'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
          >
            Back to Candidates
          </Link>
        </div>
      </div>
    );
  }

  const getTestQuestions = await getTestQuestionByTestId(getExam.testId);

  const totalQuizScore = getTestQuestions
    ? getTestQuestions.reduce((sum, item) => item.question.score + sum, 0)
    : 0;

  const { id, user, totalScore, startedAt, userAnswers } = getExam;

  return (
    <div className='space-y-10 mx-4 md:mx-auto max-w-3xl py-10'>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard/candidates'>
              Candidates
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Candidate Info Card */}
      <div className='bg-white dark:bg-gray-900 shadow-lg rounded-xl p-7 flex items-center gap-6 border border-gray-100 dark:border-gray-700'>
        {user.image ? (
          <Image
            src={user.image}
            alt='User Image'
            width={72}
            height={72}
            className='w-18 h-18 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700'
          />
        ) : (
          <div className='w-18 h-18 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-2xl border-2 border-blue-200 dark:border-blue-700'>
            {user.name[0]}
          </div>
        )}
        <div>
          <h1 className=' font-bold text-gray-900 dark:text-gray-100'>
            {user.name}
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>{user.email}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Started:{' '}
            <span className='font-medium'>
              {new Date(startedAt).toLocaleString()}
            </span>
          </p>
          <p className='text-gray-600 dark:text-gray-300'>
            Total Questions: {getTestQuestions ? getTestQuestions.length : 0}
          </p>
          <p className='text-gray-600 dark:text-gray-300'>
            Attended : {userAnswers.length}
          </p>

          <p className='font-semibold mt-3 text-blue-600 dark:text-blue-400 text-lg'>
            Total Score:{' '}
            <span className='font-bold'>
              {totalScore} / {totalQuizScore}
            </span>
          </p>
          <CompleteReview
            userTestSessionId={id}
            totalScore={userAnswers.reduce(
              (sum, item) => (item.autoScore ? item.autoScore : 0 + sum),
              0,
            )}
          />
        </div>
      </div>

      {/* Answers Section */}
      <div className='space-y-8'>
        <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2 mb-4 dark:border-gray-700'>
          Answers Review
        </h2>
        {userAnswers.map((answer, idx) => (
          <div
            key={answer.id}
            className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700 space-y-4'
          >
            <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium'>
              <span className='inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded px-2 py-0.5'>
                Question {idx + 1}
              </span>
              <span className='text-gray-400 dark:text-gray-600'>|</span>
              <span className='capitalize'>{answer.question.type}</span>
            </div>
            <p className='font-semibold text-gray-900 dark:text-gray-100 text-lg'>
              {answer.question.text}
            </p>

            <div className='mt-2'>
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Your Answer:
              </p>
              <p
                className={`p-2 rounded-lg border text-base ${
                  answer.autoScore === 0
                    ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700'
                    : answer.autoScore
                      ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                      : 'bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
                }`}
              >
                {answer.response || (
                  <span className='italic text-gray-400 dark:text-gray-500'>
                    No answer given
                  </span>
                )}
              </p>
            </div>

            {answer.question.type === 'MCQ' && (
              <div>
                <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Correct Answer:
                </p>
                <p className='p-2 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-700 font-semibold'>
                  {answer.question.correct}
                </p>
              </div>
            )}

            <div className='flex justify-end gap-4 text-sm text-gray-600 dark:text-gray-300 mt-2'>
              <span>
                <span className='font-medium text-gray-800 dark:text-gray-100'>
                  Score:
                </span>{' '}
                {answer.autoScore ?? '0'}
              </span>
              <span>
                <span className='font-medium text-gray-800 dark:text-gray-100'>
                  Max:
                </span>{' '}
                {answer.question.score}
              </span>
            </div>

            {answer.question.type === 'TEXT' && (
              <IsCorrectText
                answerId={answer.id}
                questionScore={answer.question.score}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateAnswerReview;
