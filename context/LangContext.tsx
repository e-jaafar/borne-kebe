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

      const browserLangs = navigator.languages || [navigator.language]
      const detectedLang = browserLangs
        .map(lang => lang.split('-')[0].toLowerCase())
        .find(lang => languages.includes(lang as Lang))

      const savedLang = localStorage.getItem('preferred-lang') as Lang | null
      const initialLang = savedLang || detectedLang as Lang || defaultLang
      
      setLangState(initialLang)
      
      if (!languages.includes(urlLang as Lang)) {
        const newPath = pathname === '/' ? `/${initialLang}` : `/${initialLang}${pathname}`
        router.replace(newPath)
      }
    } catch (error) {
      console.error('Error setting language:', error)
    }
  }, [pathname])

  const setLang = (newLang: Lang) => {
    try {
      setLangState(newLang)
      localStorage.setItem('preferred-lang', newLang)
      
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