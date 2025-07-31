import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';

interface BackButtonProps {
  className?: string;
  href:string,
  label:string
}

const BackButton: FC<BackButtonProps> = ({ href, label }) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;