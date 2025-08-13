import { getGroupByID } from '@/actions/dashboard/group';

import { Card, CardContent } from '@/components/ui/card';

import { notFound } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {} from '@/components/ui/dropdown-menu';

import QuestionForm from '@/app/dashboard/_components/Question/QuestionForm';
import QuestionChoice from '@/app/dashboard/_components/Question/QuestionChoice';

import EditQuestion from '@/app/dashboard/_components/Question/EditQuestion';
import QuestionDelete from '@/app/dashboard/_components/Question/QuestionDelete';

import { MoreHorizontal } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type GroupPageType = {
  params: Promise<{ groupId: string }>;
};

async function GroupPage({ params }: GroupPageType) {
  const { groupId } = await params;
  const group = await getGroupByID(groupId);

  if (!group) return notFound();

  return (
    <div className='space-y-8 mx-4 md:mx-10  py-8'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard/tests'>Tests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/tests/${group.testId}`}>
              Tests Group
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{group.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex justify-between items-center'>
        <h1 className=' font-bold'>{group.name}</h1>
        <QuestionForm groupId={group.id} />
      </div>

      <h2 className=' font-semibold mt-6'>Questions</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {group.questions.length > 0 &&
          group.questions.map(q => (
            <div key={q.id}>
              <Card>
                <CardContent className=''>
                  <div className=' flex justify-between items-start'>
                    <div>
                      <h6 className='font-bold'>{q.text}</h6>
                      <p className='text-sm text-muted-foreground'>
                        Type: {q.type}
                      </p>
                      <p className='text-sm text-green-700'>Score: {q.score}</p>
                    </div>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className='w-6 h-6' />
                      </PopoverTrigger>
                      <PopoverContent className='w-full bg-transparent flex flex-col items-start gap-2'>
                        {q.type === 'MCQ' && (
                          <>
                            <QuestionChoice
                              questionId={q.id}
                              question={q.text}
                              selectedIndex={q.choices.map(
                                item => item.index && item.index,
                              )}
                            />
                            <EditQuestion question={q} />
                          </>
                        )}

                        <QuestionDelete questionId={q.id} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    {q.choices.length > 0 && (
                      <ul className='mt-4 space-y-2'>
                        {q.choices.map(item => (
                          <li
                            key={item.id}
                            className={`flex items-center gap-2 rounded ${q.correct === item.index ? 'bg-green-700' : 'bg-muted'} px-3 py-2`}
                          >
                            <span className='font-semibold text-primary '>
                              {item.index}.
                            </span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default GroupPage;
