import { useMyInfo } from '@/lib/api/hooks/useAuth'
import { requireAuth } from '@/lib/api/requireAuth.ts'
import { createFileRoute } from '@tanstack/react-router'
import { UserCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/profile')({
  beforeLoad: () => requireAuth(),
  component: ProfilePage,
})
function ProfilePage() {
  const { t } = useTranslation('profile')
  const { data: user, isLoading, error } = useMyInfo()

  return (
    <main className="main-layout flex w-full flex-col items-center justify-center p-4 md:ml-56 md:max-w-[calc(100vw-14rem)]">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body items-center text-center">
          <div className="mb-4">
            <div className="bg-base-200 flex w-24 items-center justify-center rounded-full">
              <UserCircle className="text-primary size-20" />
            </div>
          </div>
          <h2 className="card-title mb-2">{t('title')}</h2>
          {isLoading && <span className="loading loading-spinner" />}
          {error && <div className="text-error">{t('error')}</div>}
          {user && (
            <ul className="w-full text-left">
              <li>
                <span className="font-semibold">{t('login')}:</span>{' '}
                {user.login}
              </li>
              <li>
                <span className="font-semibold">{t('displayName')}:</span>{' '}
                {user.displayName}
              </li>
              <li>
                <span className="font-semibold">{t('id')}:</span> {user.id}
              </li>
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
