import { useLogin } from '@/lib/api/hooks/useAuth'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Eye, EyeOff, Key, User } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const loginMutation = useLogin()
  const { t } = useTranslation('login')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const tokens = await loginMutation({ login, password })
      localStorage.setItem('accessToken', tokens.access)
      localStorage.setItem('refreshToken', tokens.refresh)
      router.navigate({ to: '/events' })
    } catch (e: any) {
      setError(e?.message || t('error'))
    }
  }

  return (
    <main className="main-layout flex min-h-[80vh] w-full items-center justify-center p-4 md:ml-56 md:max-w-[calc(100vw-14rem)]">
      <form
        className="card bg-base-100 w-full max-w-md p-0 shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="card-body gap-4">
          <legend className="fieldset-legend mb-2 w-full">
            <h1 className="w-full text-center text-2xl font-bold">
              {t('title')}
            </h1>
          </legend>
          <div className="input flex w-full items-center gap-2">
            <User className="text-base-content/50 size-4" />
            <input
              type="text"
              className="w-full"
              required
              placeholder={t('loginPlaceholder')}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="input relative flex w-full items-center gap-2">
            <Key className="text-base-content/50 size-4" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full pr-10"
              required
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn btn-ghost btn-xs absolute top-1/2 right-2 -translate-y-1/2"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t('hidePassword') : t('showPassword')}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {error && (
            <div className="text-error w-full text-center">{error}</div>
          )}
          <button className="btn btn-primary mt-2 w-full" type="submit">
            {t('loginBtn')}
          </button>
        </div>
      </form>
    </main>
  )
}
