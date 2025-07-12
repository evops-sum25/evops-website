import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function HeaderEvents() {
  const router = useRouter()
  const [signedUp, setSignedUp] = useState(false)

  useEffect(() => {
    setSignedUp(localStorage.getItem('signedUp') === 'true')
    const onStorage = () =>
      setSignedUp(localStorage.getItem('signedUp') === 'true')
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <header
      className={clsx(
        signedUp ? 'flex-row-reverse' : 'flex-row',
        'flex w-full items-center justify-between px-10 py-5',
      )}
    >
      {!signedUp ? (
        <>
          <p className="text-lg font-semibold">Hi, guest!</p>
          <button
            className="btn btn-primary"
            onClick={() => router.navigate({ to: '/signup' })}
          >
            Sign Up
          </button>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <UserCircle className="text-primary size-8" />
          <span className="text-base-content font-semibold">My profile</span>
        </div>
      )}
    </header>
  )
}
