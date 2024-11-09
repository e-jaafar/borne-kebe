import { isValidLang, languages } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { Analytics } from "@vercel/analytics/react"
import { SchemaOrg } from '@/components/SchemaOrg'
import { Metadata } from 'next'

type LayoutProps = {
  children: React.ReactNode
  params: { lang: string }
}

const baseUrl = 'https://www.xn--borne-kb-80ai.com'

export default function Layout({ children, params: { lang } }: LayoutProps) {
  if (!isValidLang(lang)) {
    notFound()
  }

  return (
    <>
      <SchemaOrg />
      {children}
      <Analytics />
    </>
  )
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: "Borne Kébè | Location de Photobooth Professionnel",
    description: "Location de photobooths haut de gamme pour vos événements professionnels et privés. Qualité studio, partage instantané et personnalisation complète.",
    keywords: "photobooth, borne photo, événement, mariage, soirée entreprise, photo booth, animation événementielle",
    openGraph: {
      title: "Borne Kébè | Location de Photobooth Professionnel",
      description: "Location de photobooths haut de gamme pour vos événements",
      images: [{
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Borne Kébè Photobooth'
      }],
      locale: 'fr_FR',
      type: 'website',
      url: baseUrl,
      siteName: 'Borne Kébè',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Borne Kébè | Location de Photobooth Professionnel',
      description: 'Location de photobooths haut de gamme pour vos événements',
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: Object.fromEntries(
        languages.map(l => [l, `${baseUrl}/${l}`])
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
} 