import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HeaderEvents() {
  const { t } = useTranslation('eventsList')
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
        'flex w-full items-center justify-between px-10 py-5 md:ml-56 md:max-w-[calc(100vw-14rem)]',
      )}
    >
      {!signedUp ? (
        <>
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">{t('greeting')}</p>
            <LanguageSwitcher />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => router.navigate({ to: '/signup' })}
          >
            {t('signUp')}
          </button>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <UserCircle className="text-primary size-8" />
          <span className="text-base-content font-semibold">
            {t('myProfile')}
          </span>
        </div>
      )}
    </header>
  )
}
