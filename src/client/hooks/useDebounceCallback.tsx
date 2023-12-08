import { useCallback, useRef } from "react";

/**
 * useDebouncedCallback hook
 * @param callback The callback function to debounce.
 * @param delay The delay in milliseconds for the debounce.
 * @returns A debounced version of the callback function.
 */
function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const argsRef = useRef<Parameters<T>>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      argsRef.current = args;

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current);
        }
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export default useDebouncedCallback;
