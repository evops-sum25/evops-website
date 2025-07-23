import { useSearch } from '@/lib/api/hooks/eventService/getEvents.ts'
import { useEffect, useState } from 'react'

export function useSearchLogic(query: string) {
  return useSearch(query)
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounce, setDebounce] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounce
}
