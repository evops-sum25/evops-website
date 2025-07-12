import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function SignUpHeader() {
  const router = useRouter()
  const [signedUp, setSignedUp] = useState(false)

  useEffect(() => {
    setSignedUp(localStorage.getItem('signedUp') === 'true')
    const onStorage = () =>
      setSignedUp(localStorage.getItem('signedUp') === 'true')
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (signedUp) return null

  return (
    <header className="flex w-full flex-row items-center justify-between p-3">
      <p className="text-base-content font-semibold">Hi, guest!</p>
      <button
        className="btn btn-primary"
        onClick={() => router.navigate({ to: '/signup' })}
      >
        Sign Up
      </button>
    </header>
  )
}
