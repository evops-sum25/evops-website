export function registerSW() {
  console.log(
    '[PWA] Checking ServiceWorker support:',
    'serviceWorker' in navigator,
  )

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('[PWA] Registering ServiceWorker...')

      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] SW registered successfully:', registration)
          console.log('[PWA] Scope:', registration.scope)

          // Проверяем обновления
          registration.addEventListener('updatefound', () => {
            console.log('[PWA] SW update found')
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                console.log('[PWA] SW state changed:', newWorker.state)
              })
            }
          })
        })
        .catch((registrationError) => {
          console.error('[PWA] SW registration failed:', registrationError)
        })

      // Слушаем сообщения от SW
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('[PWA] Message from SW:', event.data)
      })

      // Проверяем, установлено ли PWA
      window.addEventListener('appinstalled', () => {
        console.log('[PWA] App was installed')
      })
    })
  }
}
