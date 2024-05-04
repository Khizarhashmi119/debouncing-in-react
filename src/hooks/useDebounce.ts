import { useEffect, useRef, useState } from "react";

const useDebounce = <T>(initialValue: T, callback: Function, delay: number) => {
  const [value, setValue] = useState<T | null>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => callback(), delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback, delay, value]);

  return [value, setValue];
};

export default useDebounce;
