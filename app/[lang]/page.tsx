import { Lang, isValidLang } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { HomePage } from '@/components/HomePage'
import { translations } from '@/translations'

export default function Page({ params: { lang } }: { params: { lang: string } }) {
  if (!isValidLang(lang)) {
    notFound()
  }

  // Utiliser un type plus spécifique pour les traductions
  const currentLang = lang as Lang
  const t = translations[currentLang]

  return <HomePage lang={currentLang} translations={t} />
}

export function generateStaticParams() {
  return ['fr', 'en', 'nl'].map((lang) => ({ lang }))
} 