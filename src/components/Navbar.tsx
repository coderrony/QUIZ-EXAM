'use client';
import { logout } from '@/actions/auth/logout';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/button';

import useMySession from '@/hooks/useSession';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {

  const session = useMySession()
  console.log('Navbar mySession ', session);


  const handleLogout =async ()=> {
     await logout()
  }

  return (
    <nav
      className={`bg-white shadow-md px-8 py-4 flex items-center justify-between ${
        className || ''
      }`}
    >
      <div className='flex items-center space-x-3'>
        <span className='text-2xl font-bold text-blue-600'>
          <Link href={'/'}>QuizExam</Link>
        </span>
      </div>
      <ul className='flex space-x-6'>
        <li>
          <Link
            href='/'
            className='text-gray-700 hover:text-blue-600 font-medium transition'
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href='/quizzes'
            className='text-gray-700 hover:text-blue-600 font-medium transition'
          >
            Quizzes
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard'
            className='text-gray-700 hover:text-blue-600 font-medium transition'
          >
            Dashboard
          </Link>
        </li>
      
      </ul>
      <div className='space-x-2'>
        {session ? (
          <button
            onClick={handleLogout}
            className='cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold'
          >
            Logout
          </button>
        ) : (
          <>
            <Button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold'>
              <Link href='/auth/login'>Login</Link>
            </Button>
            <Button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold'>
              <Link href='/auth/register'>Signup</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
