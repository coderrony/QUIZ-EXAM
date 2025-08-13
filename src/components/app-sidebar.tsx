'use client';

import * as React from 'react';
import {
  IconChartBar,
  IconDashboard,
  IconInnerShadowTop,
  IconPencilPlus,
  // IconListDetails,
  IconReport,
  IconUsers,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';

import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Separator } from './ui/separator';
import Link from 'next/link';
import useMySession from '@/hooks/useSession';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/logo.png',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    // {
    //   title: 'Positions',
    //   url: '/dashboard/positions',
    //   icon: IconListDetails,
    // },
    {
      title: 'Tests',
      url: '/dashboard/tests',
      icon: IconChartBar,
    },
    {
      title: 'Setup Quiz',
      url: '/dashboard/setup-quiz',
      icon: IconPencilPlus,
    },
    {
      title: 'Candidates',
      url: '/dashboard/candidates',
      icon: IconUsers,
    },
    {
      title: 'Results',
      url: '/dashboard/results',
      icon: IconReport,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useMySession()

  
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <Link href='/dashboard'>
                <IconInnerShadowTop className='!size-5' />
                <span className='text-base  font-bold text-blue-600'>
                  Quiz Exam.
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {session?.user &&  <NavUser user={session.user} /> }
       
      </SidebarFooter>
    </Sidebar>
  );
}
