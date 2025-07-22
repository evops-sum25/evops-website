import { redirect } from '@tanstack/react-router'

export function requireAuth() {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if (!accessToken && !refreshToken) {
    throw redirect({ to: '/login' })
  }
}
