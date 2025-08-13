"use client";

import { useEffect, useRef } from "react";

const useDebounce = (callback: (...args: string[]) => void, delay: number) => {
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, []);

  const debounceValue = (...args: string[]) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debounceValue;
};

export default useDebounce;
