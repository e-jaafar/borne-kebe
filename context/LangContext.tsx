'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Lang, languages, defaultLang } from '@/config/i18n'

type LangContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [lang, setLangState] = useState<Lang>(defaultLang)

  useEffect(() => {
    try {
      const urlLang = pathname.split('/')[1]
      if (languages.includes(urlLang as Lang)) {
        setLangState(urlLang as Lang)
        localStorage.setItem('preferred-lang', urlLang as Lang)
        return
      }

      const savedLang = localStorage.getItem('preferred-lang') as Lang | null
      const browserLang = navigator.language.split('-')[0]
      const detectedLang = languages.includes(browserLang as Lang) ? browserLang as Lang : defaultLang
      const initialLang = savedLang || detectedLang
      
      setLangState(initialLang)
      
      if (!languages.includes(urlLang as Lang)) {
        router.replace(`/${initialLang}${pathname}`)
      }
    } catch (error) {
      console.error('Error setting language:', error)
    }
  }, [pathname])

  const setLang = (newLang: Lang) => {
    try {
      setLangState(newLang)
      localStorage.setItem('preferred-lang', newLang)
      
      // Mettre à jour l'URL
      const newPathname = pathname.replace(/^\/[^\/]+/, `/${newLang}`)
      router.replace(newPathname)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LangContext)
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return context
} 