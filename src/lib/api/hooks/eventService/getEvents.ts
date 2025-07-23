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
    queryKey: ['events', last],
    queryFn: async () => await api.eventService.list(apiParam),
    refetchOnWindowFocus: false,
    staleTime: 0,
  })
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => await api.eventService.list({ search: query }),
    enabled: query.length > 0,
    refetchOnWindowFocus: false,
    staleTime: 0,
  })
}

export function useEventsByTags(tagIds: string[], last: string = '') {
  let apiParam
  if (last === '') {
    apiParam = { limit: 25n, tagIds: tagIds }
  } else {
    apiParam = { limit: 25n, lastId: last, tagIds: tagIds }
  }

  return useQuery({
    queryKey: ['events', 'tags', tagIds, last],
    queryFn: async () => await api.eventService.list(apiParam),
    enabled: tagIds.length > 0,
    refetchOnWindowFocus: false,
    staleTime: 0,
  })
}
