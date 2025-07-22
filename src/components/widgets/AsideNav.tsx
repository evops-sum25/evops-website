import { useLocation, useRouter } from '@tanstack/react-router'
import { Home, Plus, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AsideNav() {
  const router = useRouter()
  const location = useLocation()
  const { t } = useTranslation('asideNav')
  const [currentPath, setCurrentPath] = useState('asideNav')

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/events' && currentPath === '/') return true
    return currentPath === path
  }

  const navItems = [
    {
      label: 'home',
      to: '/events',
      icon: Home,
    },
    {
      label: 'create',
      to: '/events/new',
      icon: Plus,
    },
    {
      label: 'profile',
      to: '/profile',
      icon: User,
    },
  ]

  const shouldHide =
    location.pathname === '/login' || location.pathname === '/signup'

  if (shouldHide) {
    return null
  }

  return (
    <aside className="bg-base-100 border-base-200 z-40 hidden border-r md:fixed md:top-0 md:left-0 md:flex md:h-full md:w-56 md:flex-col">
      <div className="border-base-200 mt-2 flex items-center justify-center gap-3 border-b p-4">
        <img alt="EvOps-logo" src="/logo.png" className="size-8"/>
        <h1 className="text-primary text-xl font-bold">EvOps</h1>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map(({ label, to, icon: Icon }) => (
          <button
            key={to}
            className={`btn flex flex-row items-center gap-3 text-base font-medium transition-all ${
              isActive(to)
                ? 'btn-primary'
                : 'btn-ghost hover:bg-primary/10 hover:text-primary'
            }`}
            onClick={() => router.navigate({ to })}
          >
            <Icon className="size-6 transition-all group-hover:scale-110" />
            <span>{t(`${label as 'profile' | 'home' | 'create'}`)}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
