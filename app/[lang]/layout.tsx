import { Lang, isValidLang, languages } from '@/config/i18n'
import { notFound } from 'next/navigation'

export default function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isValidLang(lang)) {
    notFound()
  }

  return children
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'
  
  return {
    // ... autres métadonnées
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: Object.fromEntries(
        languages.map(l => [l, `${baseUrl}/${l}`])
      ),
    },
  }
} 