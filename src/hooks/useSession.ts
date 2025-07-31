'use client';
import { MySession } from '@/providers/SessionProvider';
import { useContext } from 'react';



const useMySession = () => {
  return useContext(MySession);  

};

export default useMySession;
