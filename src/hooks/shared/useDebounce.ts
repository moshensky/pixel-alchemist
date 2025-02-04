import { useEffect, useRef } from 'react'

export function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return ((...args) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }) as T
}
