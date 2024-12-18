import { Lang, isValidLang } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { HomePage } from '@/components/HomePage'
import { translations } from '@/translations'
import type { HomePageTranslations } from '@/types/translations'

export default function Page({ params: { lang } }: { params: { lang: string } }) {
  if (!isValidLang(lang)) {
    notFound()
  }

  const currentLang = lang as Lang
  const t: HomePageTranslations = {
    hero: {
      ...translations[currentLang].hero,
      sequences: [...translations[currentLang].hero.sequences]
    },
    features: {
      ...translations[currentLang].features,
      title: translations[currentLang].features.title,
      subtitle: translations[currentLang].features.subtitle,
      cta: translations[currentLang].features.cta,
      items: [...translations[currentLang].features.items]
    },
    why: {
      ...translations[currentLang].why,
      items: [...translations[currentLang].why.items]
    },
    reviews: {
      ...translations[currentLang].reviews,
      items: [...translations[currentLang].reviews.items]
    },
    contact: translations[currentLang].contact,
    howItWorks: {
      ...translations[currentLang].howItWorks,
      steps: [...translations[currentLang].howItWorks.steps]
    },
    gallery: translations[currentLang].gallery,
    scrollToTop: translations[currentLang].scrollToTop,
    stats: {
      ...translations[currentLang].stats,
      items: [...translations[currentLang].stats.items]
    }
  }

  return <HomePage lang={currentLang} translations={t} />
}

export function generateStaticParams() {
  return ['fr', 'en', 'nl'].map((lang) => ({ lang }))
}

export const revalidate = 3600 // Revalider toutes les heures 