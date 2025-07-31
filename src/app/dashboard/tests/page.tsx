import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
  Calendar,
  Edit,
  Eye,
  FileQuestionMarkIcon,
  Group,
  MoreHorizontal,
  Timer,
  Trash2,
} from 'lucide-react';
import TestForm from '../_components/Tests/TestForm';
import { auth } from '@/auth';
import { MySessionType } from '@/providers/SessionProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/utils/dateFormat';
import Link from 'next/link';
import { getTestByUserID } from '@/data-query/dashboard';

async function TestsPage() {
  const session = (await auth()) as MySessionType;
  const myTest = await getTestByUserID(session.user.id);

  return (
    <div className='space-y-6 px-6 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Tests</h1>
          <p className='text-muted-foreground mt-2'>
            Create and manage assessment tests for candidates
          </p>
        </div>
        <TestForm />
      </div>

      {/* Tests List */}
      <div className='space-y-6'>
        {myTest.map(test => (
          <Card
            key={test.id}
            className='group border border-border rounded-xl transition-all hover:scale-[1.01] hover:border-primary/50 hover:shadow-lg hover:bg-gradient-to-br hover:from-primary/5 hover:to-background'
          >
            <CardContent className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-1'>
                    <h3 className='text-xl font-semibold text-foreground group-hover:text-primary'>
                      {test.name}
                    </h3>
                    <span className='px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 group-hover:bg-green-200'>
                      Active
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Position:{' '}
                    <span className='font-medium'>{test.position}</span>
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreHorizontal className='w-5 h-5' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>
                      <Link
                        href={`/dashboard/tests/${test.id}`}
                        className='flex items-center gap-2'
                      >
                        <Eye className='w-4 h-4 mr-2' />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className='w-4 h-4 mr-2' />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-destructive'>
                      <Trash2 className='w-4 h-4 mr-2' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
                <InfoBox
                  icon={<Timer className='w-5 h-5 text-primary' />}
                  label='Duration'
                  value={`${test.durationMin} min`}
                />
                <InfoBox
                  icon={<Group className='w-5 h-5 text-primary' />}
                  label='Groups'
                  value={test.groups.length}
                />
                <InfoBox
                  icon={<Calendar className='w-5 h-5 text-primary' />}
                  label='Start Date'
                  value={formatDate(test.date)}
                />
              </div>

              <div className='flex gap-3'>
                <Button variant='outline' size='sm' asChild>
                  <Link
                    href={`/dashboard/tests/${test.id}`}
                    className='flex items-center gap-2'
                  >
                    <FileQuestionMarkIcon className='w-4 h-4' />
                    Create Quiz
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg shadow-sm group-hover:bg-muted/70'>
      {icon}
      <div>
        <p className='text-sm font-medium text-foreground'>{value}</p>
        <p className='text-xs text-muted-foreground'>{label}</p>
      </div>
    </div>
  );
}

export default TestsPage;
