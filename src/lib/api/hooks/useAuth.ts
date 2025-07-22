import getApi from '@/lib/api/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const api = getApi()

export function useLogin() {
  const queryClient = useQueryClient()

  return useCallback(
    async ({ login, password }: { login: string; password: string }) => {
      const res = await api.authService.logIn({
        credentials: { login, password },
      })
      if (!res.tokens) throw new Error('No tokens returned')

      queryClient.invalidateQueries({ queryKey: ['myInfo'] })

      return res.tokens
    },
    [queryClient],
  )
}

export function useSignUp() {
  const queryClient = useQueryClient()

  return useCallback(
    async ({
      login,
      displayName,
      password,
    }: {
      login: string
      displayName: string
      password: string
    }) => {
      const res = await api.authService.signUp({
        form: { login, displayName, password },
      })
      if (!res.tokens) throw new Error('No tokens returned')

      queryClient.invalidateQueries({ queryKey: ['myInfo'] })

      return res.tokens
    },
    [queryClient],
  )
}

export function useMyInfo() {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  return useQuery({
    queryKey: ['myInfo'],
    queryFn: async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined
      const res = await api.authService.getMyInfo({}, { headers })
      return res.user
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
  })
}
