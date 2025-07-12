import getApi from '@/lib/api/api.ts'
import { useQuery } from '@tanstack/react-query'

const api = getApi()

export function useSingleEvent(params: { id: string }) {
  return useQuery({
    queryKey: ['event', params.id],
    queryFn: async () => await api.eventService.find({ id: params.id }),
    enabled: !!params.id,
  })
}
