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
  const [isStandalone, setIsStandalone] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    setIsStandalone(standalone)

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    if (iOS && !standalone) {
      const timer = setTimeout(() => {
        setShowInstall(true)
      }, 3000)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('beforeinstallprompt', handler)
      }
    }

    if (!iOS && !standalone && 'serviceWorker' in navigator) {
      const timer = setTimeout(() => {
        setShowInstall(true)
      }, 2000)
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
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        handleClose()
      }
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
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-end justify-center p-4 sm:items-center">
        <div
          className={`relative mx-auto w-full max-w-sm transition-all duration-300 ${
            isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
          }`}
        >
          <div className="card bg-base-100 border-base-300 border shadow-2xl">
            <div className="card-body">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <img
                    alt="logo"
                    src="/logo.png"
                    className="text-primary h-8 w-8"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t('title')}</h3>
                  <p className="text-sm opacity-70">{t('subtitle')}</p>
                </div>
              </div>

              {/* Основной контент */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="text-success h-4 w-4"
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
                  <div>
                    <p className="text-sm font-medium">{t('feature1')}</p>
                    <p className="text-xs opacity-60">{t('feature1Desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-success/10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="text-success h-4 w-4"
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
                  <div>
                    <p className="text-sm font-medium">{t('feature2')}</p>
                    <p className="text-xs opacity-60">{t('feature2Desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-success/10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="text-success h-4 w-4"
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
                  <div>
                    <p className="text-sm font-medium">{t('feature3')}</p>
                    <p className="text-xs opacity-60">{t('feature3Desc')}</p>
                  </div>
                </div>
              </div>

              {isIOS && (
                <div className="alert alert-info mt-4">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium">{t('iosInstructions')}</p>
                    <p className="mt-1 text-xs opacity-80">
                      {t('iosSteps')} <span className="kbd kbd-xs">⎙</span> → "
                      {t('iosAddToHome')}"
                    </p>
                  </div>
                </div>
              )}

              <div className="card-actions mt-6 justify-end gap-2">
                <button className="btn btn-ghost btn-sm" onClick={handleClose}>
                  <svg
                    className="mr-1 h-4 w-4"
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
                  {t('decline')}
                </button>

                {deferredPrompt ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleInstall}
                  >
                    <svg
                      className="mr-1 h-4 w-4"
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
                    className="btn btn-primary btn-sm"
                    onClick={handleClose}
                  >
                    <svg
                      className="mr-1 h-4 w-4"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
