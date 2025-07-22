import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { useMyInfo } from '@/lib/api/hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation('header')
  const { data: user, isSuccess } = useMyInfo()
  const queryClient = useQueryClient()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem('accessToken')
      if (currentToken !== token) {
        setToken(currentToken)
        queryClient.invalidateQueries({ queryKey: ['myInfo'] })
      }
    }

    checkToken()

    const interval = setInterval(checkToken, 100)

    return () => clearInterval(interval)
  }, [token, queryClient])

  const isAuth = isSuccess && user

  return (
    <header className="bg-base-100 border-base-200 fixed z-20 flex w-full flex-row-reverse items-center justify-between border-b px-4 py-4 shadow-lg backdrop-blur-sm md:ml-56 md:max-w-[calc(100vw-14rem)] md:justify-start md:gap-8 md:px-10">
      <LanguageSwitcher />
      {!isAuth && (
        <div className="flex gap-2">
          <Link to="/login" className="btn btn-outline btn-sm">
            {t('login')}
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            {t('signup')}
          </Link>
        </div>
      )}
    </header>
  )
}
