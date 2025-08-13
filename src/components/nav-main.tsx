'use client';

import {  type Icon } from '@tabler/icons-react';


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {


  const path = usePathname()
  

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
     
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`cursor-pointer ${
                    item.url === path
                      ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                      : ''
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
