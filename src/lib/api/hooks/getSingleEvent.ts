import getApi from '@/lib/api/api.ts'
import { useQuery } from '@tanstack/react-query'

const api = getApi()

export function useSingleEvent(params: { id: string }) {
  return useQuery({
    queryKey: ['event', params.id],
    queryFn: async () => {
      const res = await api.eventService.find({ id: params.id })
      return res.event
    },
    enabled: !!params.id,
  })
}
