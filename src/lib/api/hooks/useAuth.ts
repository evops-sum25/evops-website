import getApi from '@/lib/api/api'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

const api = getApi()

export function useLogin() {
  return useCallback(
    async ({ login, password }: { login: string; password: string }) => {
      const res = await api.authService.logIn({
        credentials: { login, password },
      })
      if (!res.tokens) throw new Error('No tokens returned')
      return res.tokens
    },
    [],
  )
}

export function useSignUp() {
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
      return res.tokens
    },
    [],
  )
}

export function useMyInfo() {
  return useQuery(
    ['myInfo'],
    async () => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined
      // @connectrpc/connect allows passing headers as the second argument
      const res = await api.authService.getMyInfo({}, { headers })
      return res.user
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  )
}
