import { Lang, isValidLang } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { ContactPage } from '@/components/ContactPage'
import { translations } from '@/translations'

export default function Page({ params: { lang } }: { params: { lang: string } }) {
  if (!isValidLang(lang)) {
    notFound()
  }

  return <ContactPage translations={translations[lang as Lang]} />
}

export function generateStaticParams() {
  return ['fr', 'en', 'nl'].map((lang) => ({ lang }))
} 