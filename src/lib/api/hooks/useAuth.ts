import getApi from '@/lib/api/api'
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
