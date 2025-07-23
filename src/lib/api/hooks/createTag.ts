import getApi from '@/lib/api/api.ts'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const api = getApi()

export function useCreateTag() {
  const queryClient = useQueryClient()
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  return useCallback(
    async ({ name, aliases }: { name: string; aliases?: string[] }) => {
      if (!token) throw new Error('No access token')

      const headers = { Authorization: `Bearer ${token}` }
      const res = await api.tagService.create(
        {
          form: { name, aliases: aliases || undefined },
        },
        { headers },
      )

      queryClient.invalidateQueries({ queryKey: ['tags'] })

      return res.tagId
    },
    [queryClient, token],
  )
}
