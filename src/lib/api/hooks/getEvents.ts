import getApi from '@/lib/api/api.ts'
import { useQuery } from '@tanstack/react-query'

const api = getApi()

export function useEvents({
  lastId = '',
  limit = 25,
  tagIds = [],
  search = '',
}: {
  lastId?: string
  limit?: number
  tagIds?: string[]
  search?: string
} = {}) {
  const apiParam: any = { limit }
  if (lastId) apiParam.lastId = lastId
  if (tagIds.length > 0) apiParam.tagIds = tagIds
  if (search) apiParam.search = search

  return useQuery({
    queryKey: ['events', apiParam],
    queryFn: async () => {
      return await api.eventService.list(apiParam)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 0,
    enabled: true,
  })
}
