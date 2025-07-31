// import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

import DashboardCard from './_components/Dashboard/DashboardCard';
import { getTestByUserID } from '@/data-query/dashboard';
import { notFound } from 'next/navigation';
import { MySessionType } from '@/providers/SessionProvider';

export default async function DashboardPage() {
  const session = (await auth()) as MySessionType;
  if (!session) return notFound();

  const totalTests = await getTestByUserID(session.user.id);

  const totalGroup = totalTests.reduce((count, item) => {
    return count + item.groups.length;
  }, 0);

  const totalQuestion = totalTests.reduce((count, item) => {
    return (
      count +
      item.groups.reduce((qTotal, q) => {
        return qTotal + q.questions.length;
      }, 0)
    );
  }, 0);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
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
    </div>
  );
}
