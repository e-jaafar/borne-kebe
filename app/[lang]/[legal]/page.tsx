import { Lang, isValidLang } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { translations } from '@/translations'
import { LegalPage } from '@/components/LegalPage'

type LegalSection = {
  title: string
  content: readonly string[]
}

type LegalType = 'privacy' | 'terms' | 'cookies'

export default function Page({ 
  params: { lang, legal } 
}: { 
  params: { lang: string; legal: string } 
}) {
  if (!isValidLang(lang)) {
    notFound()
  }

  if (!['privacy', 'terms', 'cookies'].includes(legal)) {
    notFound()
  }

  const t = translations[lang as Lang].legal
  const legalSection = t[legal as LegalType] as LegalSection

  if (!legalSection || !legalSection.title || !legalSection.content) {
    notFound()
  }

  return (
    <LegalPage 
      title={legalSection.title}
      content={legalSection.content}
      type={legal as LegalType}
    />
  )
}

export function generateStaticParams() {
  return ['fr', 'en', 'nl'].flatMap((lang) => 
    ['privacy', 'terms', 'cookies'].map((legal) => ({
      lang,
      legal
    }))
  )
} 