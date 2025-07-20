import { useRouter } from '@tanstack/react-router'
import { Home, Plus, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const isActive = (path: string) => {
    if (path === '/events' && currentPath === '/') return true
    return currentPath === path
  }

  return (
    <nav className="btm-nav bg-base-100 fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-between px-8 py-2 md:hidden">
      <button
        className="flex flex-1 flex-col items-center justify-center"
        onClick={() => router.navigate({ to: '/events' })}
      >
        <Home
          className="size-7"
          color={isActive('/events') ? '#6366f1' : '#a3a3a3'}
        />
      </button>
      <button
        className="flex flex-1 flex-col items-center justify-center"
        onClick={() => router.navigate({ to: '/events/new' })}
      >
        <Plus
          className="size-7"
          color={isActive('/events/new') ? '#6366f1' : '#a3a3a3'}
        />
      </button>
      <button
        className="flex flex-1 flex-col items-center justify-center"
        onClick={() => router.navigate({ to: '/profile' })}
      >
        <User
          className="size-7"
          color={isActive('/profile') ? '#6366f1' : '#a3a3a3'}
        />
      </button>
    </nav>
  )
}
