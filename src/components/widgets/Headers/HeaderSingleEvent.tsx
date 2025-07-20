import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { ChevronLeft, UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HeaderSingleEvent() {
  const { t } = useTranslation('eventPage')
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
    <header className="flex w-full flex-row items-center justify-between px-4 py-5 md:ml-56 md:max-w-[calc(100vw-14rem)] md:px-10">
      <button
        className="btn btn-ghost flex flex-row items-center p-0"
        onClick={() => router.history.back()}
      >
        <ChevronLeft className="size-5" />
        <span>{t('backToEvents')}</span>
      </button>
      <div
        className={clsx(
          !signedUp ? 'ml-8 flex-row justify-between' : 'flex-row-reverse',
          'flex w-1/2 items-center gap-3 md:w-full',
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
          <>
            <span className="order-1">
              <LanguageSwitcher />
            </span>
            <UserCircle className="text-primary size-8" />
            <span className="text-base-content font-semibold">
              {t('myProfile')}
            </span>
          </>
        )}
      </div>
    </header>
  )
}
