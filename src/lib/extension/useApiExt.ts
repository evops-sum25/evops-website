import { type ApiExt, initApiExt } from '@/lib/api/ext.ts'
import { useEffect, useState } from 'react'

export default function useApiExt() {
  const [apiExt, setApiExt] = useState<ApiExt | undefined>(undefined)
  useEffect(() => {
    async function loadApiExt() {
      const binary = await fetch('/evops.wasm').then((r) => r.arrayBuffer())
      setApiExt(await initApiExt(binary))
    }
    loadApiExt()
  })
  return apiExt
}
