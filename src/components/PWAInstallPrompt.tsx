import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const { t } = useTranslation('pwaInstall')

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showInstall, setShowInstall] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isFirefox, setIsFirefox] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    const firefox = navigator.userAgent.toLowerCase().includes('firefox')
    setIsIOS(iOS)
    setIsFirefox(firefox)

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    setIsStandalone(standalone)

    const handler = (e: Event) => {
      console.log('[PWA] beforeinstallprompt event fired')
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    if (!standalone) {
      const timer = setTimeout(
        () => {
          console.log('[PWA] Showing install prompt (fallback)')
          setShowInstall(true)
        },
        firefox ? 5000 : 3000,
      )

      return () => {
        clearTimeout(timer)
        window.removeEventListener('beforeinstallprompt', handler)
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  useEffect(() => {
    if (showInstall) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [showInstall])

  const handleInstall = async () => {
    if (deferredPrompt) {
      console.log('[PWA] Triggering install prompt')
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log('[PWA] User choice:', outcome)

      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        handleClose()
      }
    } else {
      console.log('[PWA] No deferred prompt available')
      handleClose()
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setShowInstall(false)
      localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    }, 300)
  }

  if (isStandalone) return null

  const dismissed = localStorage.getItem('pwa-install-dismissed')
  if (dismissed && Date.now() - parseInt(dismissed) < 24 * 60 * 60 * 1000) {
    return null
  }

  if (!showInstall) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-all duration-300 sm:items-center ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative mx-4 mb-4 w-full max-w-sm sm:mx-auto sm:mb-0">
        <div
          className={`relative transition-all duration-300 ${
            isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
          }`}
        >
          <div className="card bg-base-100 border-base-300 overflow-hidden rounded-2xl border shadow-2xl sm:rounded-3xl">
            <div className="from-primary/5 to-accent/5 relative bg-gradient-to-br p-6 pb-4">
              <button
                className="btn btn-ghost btn-sm btn-circle absolute top-4 right-4"
                onClick={handleClose}
                aria-label="Закрыть"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <div className="bg-primary/20 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <img alt="logo" src="/logo.png" className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-xl leading-tight font-bold">
                    {t('title')}
                  </h3>
                  <p className="mt-1 text-sm opacity-70">{t('subtitle')}</p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-4">
              <div className="mb-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-success/10 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
                    <svg
                      className="text-success h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium">{t('feature1')}</p>
                    <p className="mt-1 text-sm opacity-60">
                      {t('feature1Desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-success/10 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
                    <svg
                      className="text-success h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium">{t('feature2')}</p>
                    <p className="mt-1 text-sm opacity-60">
                      {t('feature2Desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-success/10 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
                    <svg
                      className="text-success h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium">{t('feature3')}</p>
                    <p className="mt-1 text-sm opacity-60">
                      {t('feature3Desc')}
                    </p>
                  </div>
                </div>
              </div>

              {isFirefox && (
                <div className="alert alert-info mb-6 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Для Firefox:</p>
                      <p className="mt-1 text-sm opacity-80">
                        Меню <span className="kbd kbd-xs mx-1">⋮</span> →
                        "Установить" или "Добавить на главный экран"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isIOS && (
                <div className="alert alert-info mb-6 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {t('iosInstructions')}
                      </p>
                      <p className="mt-1 text-sm opacity-80">
                        {t('iosSteps')}{' '}
                        <span className="kbd kbd-xs mx-1">⎙</span> → "
                        {t('iosAddToHome')}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row-reverse">
                {deferredPrompt ? (
                  <button
                    className="btn btn-primary btn-lg h-14 flex-1 rounded-xl text-base"
                    onClick={handleInstall}
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t('accept')}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-lg h-14 flex-1 rounded-xl text-base"
                    onClick={handleClose}
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {t('understood')}
                  </button>
                )}

                <button
                  className="btn btn-ghost btn-lg h-14 flex-1 rounded-xl text-base sm:flex-initial"
                  onClick={handleClose}
                >
                  {t('decline')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
