import { auth } from '@/auth';
import DashboardCard from './_components/Dashboard/DashboardCard';
import { getTestByUserID } from '@/data-query/dashboard';
import { notFound } from 'next/navigation';
import { MySessionType } from '@/providers/SessionProvider';
import { Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';

export default async function DashboardPage() {
  const session = (await auth()) as MySessionType;
  if (!session) return notFound();

  const totalTests = await getTestByUserID(session.user.id);

  const totalGroup = totalTests.reduce((count, item) => {
    return count + item.groups.length;
  }, 0);

  const totalAssignedTests = totalTests.reduce((count, item) => {
    return count + item.assignedTests.length;
  }, 0);

  const totalQuestion = totalTests.reduce((count, item) => {
    return (
      count +
      item.groups.reduce((qTotal, q) => {
        return qTotal + q.questions.length;
      }, 0)
    );
  }, 0);

  const totalTestSessions = totalTests.reduce((count, item) => {
    return count + item.testSessions.length;
  }, 0);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
      <Suspense fallback={<LoadingIndicator />}>
        <DashboardCard
          title={'Total Tests'}
          count={totalTests.length}
          icon={'✔'}
          percentage={'+12.5%'}
          footerText={'Compared to last month'}
        />
        <DashboardCard
          title={'Total Groups'}
          count={totalGroup}
          icon={'⚡'}
          percentage={'+22.8%'}
          footerText={'Compared to last month'}
        />
        <DashboardCard
          title={'Total Question'}
          count={totalQuestion}
          icon={'💎'}
          percentage={'+25.6%'}
          footerText={'Compared to last month'}
        />
        <DashboardCard
          title={'Total Assigned Tests'}
          count={totalAssignedTests}
          icon={'❄'}
          percentage={'+45.6%'}
          footerText={'Compared to last month'}
        />
        <DashboardCard
          title={'Total Test Sessions'}
          count={totalTestSessions}
          icon={'♻'}
          percentage={'+11.3%'}
          footerText={'Compared to last month'}
        />
      </Suspense>
    </div>
  );
}
