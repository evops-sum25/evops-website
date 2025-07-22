import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation('header')
  const isAuth =
    typeof window !== 'undefined' && localStorage.getItem('accessToken')

  return (
    <header className="flex w-full flex-row-reverse items-center gap-12 px-4 py-4 md:ml-56 md:max-w-[calc(100vw-14rem)] md:px-10">
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
