import { Lang, isValidLang } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { PricingPage } from '@/components/PricingPage'
import { translations } from '@/translations'
import type { PricingTranslations } from '@/types/translations'

export default function Page({ params: { lang } }: { params: { lang: string } }) {
  if (!isValidLang(lang)) {
    notFound()
  }

  const currentLang = lang as Lang
  const t: PricingTranslations = {
    pricing: {
      title: translations[currentLang].pricing.title,
      subtitle: translations[currentLang].pricing.subtitle,
      popularBadge: translations[currentLang].pricing.popularBadge,
      plans: translations[currentLang].pricing.plans
    }
  }

  return <PricingPage translations={t} />
}

export function generateStaticParams() {
  return ['fr', 'en', 'nl'].map((lang) => ({ lang }))
} 