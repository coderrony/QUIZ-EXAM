'use client';
import { createContext } from 'react';

export type MySessionType = {
  user: {
    name: string;
    email: string;
    image: string | null;
    id: string;
    role?:string;
  };
  expires: string;
};

export const MySession = createContext<MySessionType | null>(null);

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MySessionType;
}) {
  return <MySession.Provider value={session}>{children}</MySession.Provider>;
}
