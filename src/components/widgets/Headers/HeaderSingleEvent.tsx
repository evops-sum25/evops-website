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
    <header className="flex w-full flex-row items-center justify-between px-4 py-5 md:px-10">
      <button
        className="btn btn-ghost flex flex-row items-center p-0"
        onClick={() => router.history.back()}
      >
        <ChevronLeft className="size-5" />
        <span>Back to events</span>
      </button>
      <div
        className={clsx(
          !signedUp ? 'ml-8 flex-row justify-between' : 'flex-row-reverse',
          'flex w-1/2 items-center gap-3 md:w-full',
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
