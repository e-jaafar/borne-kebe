import { isValidLang, languages } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { Analytics } from "@vercel/analytics/react"

type LayoutProps = {
  children: React.ReactNode
  params: { lang: string }
}

export default function Layout({ children, params: { lang } }: LayoutProps) {
  if (!isValidLang(lang)) {
    notFound()
  }

  return (
    <>
      {children}
      <Analytics />
    </>
  )
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: Object.fromEntries(
        languages.map(l => [l, `${baseUrl}/${l}`])
      ),
    },
  }
} 