'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import SignUpHeader from './SignUpHeader'

export default function SingUpWrapper() {
  const pathname = usePathname()
  const [signedUp, setSignedUp] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSignedUp(localStorage.getItem('signedUp') === 'true')
    }
  }, [pathname])

  if (pathname === '/signup' || signedUp) return null

  return <SignUpHeader />
}
