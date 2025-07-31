import { getGroupByID } from '@/actions/dashboard/group';
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import QuestionForm from '@/app/dashboard/_components/Question/QuestionForm';
import QuestionChoice from '@/app/dashboard/_components/Question/QuestionChoice';

import EditQuestion from '@/app/dashboard/_components/Question/EditQuestion';
import QuestionDelete from '@/app/dashboard/_components/Question/QuestionDelete';

type GroupPageType = {
  params: Promise<{ groupId: string }>;
};
async function GroupPage({ params }: GroupPageType) {
  const { groupId } = await params;
  const group = await getGroupByID(groupId);

  // console.log('group ', group);
  // console.log('group questions:', group.questions[0]);

  if (!group) return notFound();

  return (
    <div className='mx-10 my-5 p-4 space-y-4'>
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
        <h1 className='text-2xl font-bold'>{group.name}</h1>
        <QuestionForm groupId={group.id} />
      </div>

      <h2 className='text-xl font-semibold mt-6'>Questions</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {group.questions.length > 0 &&
          group.questions.map(q => (
            <div key={q.id}>
              {q.type === 'MCQ' ? (
                <Card>
                  <CardContent className=''>
                    <div className=' flex justify-between items-start'>
                      <div>
                        <h6 className='font-bold'>{q.text}</h6>
                        <p className='text-sm text-muted-foreground'>
                          Type: {q.type}
                        </p>
                        <p className='text-sm text-green-700'>
                          Score: {q.score}
                        </p>
                      </div>

                      <div className='flex flex-col items-center justify-center gap-1'>
                        <QuestionChoice
                          questionId={q.id}
                          question={q.text}
                          selectedIndex={q.choices.map(
                            item => item.index && item.index,
                          )}
                        />

                        <EditQuestion question={q} />
                      </div>
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
                    <CardFooter>
                   <QuestionDelete questionId={q.id}/>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <h6 className='font-bold'>{q.text}</h6>
                    <p className='text-muted-foreground'>Type: {q.type}</p>
                    <p className='text-green-700'>Score: {q.score}</p>
                    <div className='italic text-gray-500'>
                      Text-based answer expected
                    </div>
                  </CardContent>
                  <CardFooter>
                  <QuestionDelete questionId={q.id}/>
                  </CardFooter>
                </Card>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default GroupPage;
