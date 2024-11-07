import { Lang, isValidLang } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { FeaturesPage } from '@/components/FeaturesPage'
import { translations } from '@/translations'

export default function Page({ params: { lang } }: { params: { lang: string } }) {
  if (!isValidLang(lang)) {
    notFound()
  }

  return <FeaturesPage translations={translations[lang as Lang]} />
}

export function generateStaticParams() {
  return ['fr', 'en', 'nl'].map((lang) => ({ lang }))
} 