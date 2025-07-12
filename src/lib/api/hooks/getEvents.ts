import getApi from '@/lib/api/api.ts'
import { useQuery } from '@tanstack/react-query'

const api = getApi()

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => await api.eventService.list({}),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
    refetchInterval: 5 * 1000,
    refetchIntervalInBackground: true,
  })
}
