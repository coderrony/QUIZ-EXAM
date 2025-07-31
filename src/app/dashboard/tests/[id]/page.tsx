import { getTestByID } from '@/actions/dashboard/test';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import GroupForm from '../../_components/Group/GroupForm';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type TestDetailsType = {
  params: Promise<{ id: string }>;
};

async function TestDetails({ params }: TestDetailsType) {
  const { id: testId } = await params;
  const myTest = await getTestByID(testId);
  // console.log("myTest ",myTest);

  if (!myTest) {
    redirect('/dashboard/tests');
  }

  return (
    <div className='mx-10 my-5 p-4 space-y-4'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard/tests'>Tests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{myTest.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>{myTest.name}</h1>
        <div>
          {/* <Button className='mr-5' asChild>
            <Link href={`/admin/tests/${myTest.id}/assign`}>Assign</Link>
          </Button> */}
          {/* <Button asChild>
            <Link href={`/admin/tests/${myTest.id}/groups/new`}>Add Group</Link>
          </Button> */}
          <GroupForm testId={testId} />
        </div>
      </div>
      <p className='text-muted-foreground'>Position: {myTest.position}</p>
      <p className='text-sm'>Date: {new Date(myTest.date).toLocaleString()}</p>
      <p className='text-sm'>Duration: {myTest.durationMin} minutes</p>

      <h2 className='text-xl font-semibold mt-6'>Groups</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {myTest.groups.map(group => (
          <Card key={group.id}>
            <CardContent className='p-4'>
              <h3 className='font-semibold'>{group.name}</h3>
              <p className='text-sm text-muted-foreground'>
                {group.questions.length} Questions
              </p>
              <Link
                href={`/dashboard/tests/${myTest.id}/group/${group.id}`}
                className='inline-block mt-2 text-blue-600 hover:underline'
              >
                Create Questions
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TestDetails;
