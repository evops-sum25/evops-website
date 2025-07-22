import { useLogin } from '@/lib/api/hooks/useAuth'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Key, User } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const loginMutation = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const tokens = await loginMutation({ login, password })
      localStorage.setItem('accessToken', tokens.access)
      localStorage.setItem('refreshToken', tokens.refresh)
      router.navigate({ to: '/events' })
    } catch (e: any) {
      setError(e?.message || 'Login failed')
    }
  }

  return (
    <main className="main-layout w-full justify-center p-4 md:ml-56 md:max-w-[calc(100vw-14rem)]">
      <form
        className="fieldset flex w-full max-w-96 flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <legend className="fieldset-legend w-full">
          <h1 className="w-full text-center text-lg">Log In</h1>
        </legend>
        <div className="input w-full">
          <User className="text-base-content/50 size-4" />
          <input
            type="text"
            className="w-full"
            required
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="input w-full">
          <Key className="text-base-content/50 size-4" />
          <input
            type="password"
            className="w-full"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-error w-full text-center">{error}</div>}
        <button className="btn btn-primary w-full" type="submit">
          Log in
        </button>
      </form>
    </main>
  )
}
