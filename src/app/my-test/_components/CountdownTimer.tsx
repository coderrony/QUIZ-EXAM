"use client";
import { FC, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
  timeLeft: number; // in seconds
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const CountdownTimer: FC<CountdownTimerProps> = ({timeLeft,setTimeLeft}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="text-3xl font-bold text-red-600">
      {timeLeft === 0 ? "Time's up!" : `${minutes}:${seconds}`}
    </div>
  );
};

export default CountdownTimer;