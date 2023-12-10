import { useCallback, useEffect, useRef } from "react";

export function useDebounceSubmit<T extends (...args: any[]) => void>(
  onSubmit: T,
  delay: number
): {
  debouncedSubmit: (...args: Parameters<T>) => void;
  cancel: () => void;
} {
  const argsRef = useRef<Parameters<T>>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSubmit = useCallback(
    (...args: Parameters<T>) => {
      argsRef.current = args;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (argsRef.current) {
          onSubmit(...argsRef.current);
        }
      }, delay);
    },
    [onSubmit, delay]
  );

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { debouncedSubmit, cancel };
}
