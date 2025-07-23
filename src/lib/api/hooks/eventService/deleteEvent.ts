import getApi from '@/lib/api/api.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const api = getApi()

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (eventId: string) => {
      const token = localStorage.getItem('accessToken')
      if (!token) throw new Error('No access token')

      await api.eventService.delete(
        { eventId: eventId },
        { headers: { Authorization: `Bearer ${token}` } },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['search'] })
    },
  })
}
