"use client"
import { useSession } from 'next-auth/react';
import { FC } from 'react';

interface TestHomeProps {
  className?: string;
}

const TestHome: FC<TestHomeProps> = () => {
    const { data } = useSession();
    console.log('TestHome data ', data);
  return (
    <div>
      <h1> TestHome </h1>
    </div>
  );
};

export default TestHome;