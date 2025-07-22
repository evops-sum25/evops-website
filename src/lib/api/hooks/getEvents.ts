import getApi from '@/lib/api/api.ts'
import { useQuery } from '@tanstack/react-query'

const api = getApi()

export function useEvents(last: string = '') {
  let apiParam
  if (last === '') {
    apiParam = { limit: 25n }
  } else {
    apiParam = { limit: 25n, lastId: last }
  }

  return useQuery({
    queryKey: ['events'],
    queryFn: async () => await api.eventService.list(apiParam),
    refetchOnWindowFocus: false,
    staleTime: 0,
  })
}
