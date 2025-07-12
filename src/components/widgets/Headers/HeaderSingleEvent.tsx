import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { ChevronLeft, UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function HeaderSingleEvent() {
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
    <header className="flex w-full flex-row items-center justify-between px-10 py-5">
      <div className="flex flex-row items-center gap-2">
        <button
          className="btn btn-ghost flex flex-row items-center gap-2"
          onClick={() => router.history.back()}
        >
          <ChevronLeft className="size-5" />
          <span>Back to events</span>
        </button>
      </div>
      <div
        className={clsx(
          !signedUp ? 'ml-8 justify-between' : '',
          'flex w-full flex-row items-center gap-3',
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
          <>
            <UserCircle className="text-primary size-8" />
            <span className="text-base-content font-semibold">My profile</span>
          </>
        )}
      </div>
    </header>
  )
}
