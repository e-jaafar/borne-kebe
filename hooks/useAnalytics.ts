declare global {
  interface GtagParams {
    page_path?: string;
    // Ajoutez d'autres propriétés spécifiques ici si nécessaire
  }

  interface Window {
    gtag: (command: string, id: string, params?: GtagParams) => void;
  }
}

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])
} 