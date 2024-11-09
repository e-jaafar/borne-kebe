import { isValidLang, languages } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { Analytics } from "@vercel/analytics/react"
import { SchemaOrg } from '@/components/SchemaOrg'

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
      <SchemaOrg />
      {children}
      <Analytics />
    </>
  )
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'

  const keywords = [
    // Mots-clés principaux
    "location photobooth",
    "borne photo",
    "photobooth Bruxelles",
    "location borne photo",
    // Services spécifiques
    "photobooth mariage",
    "borne photo événement",
    "photobooth entreprise",
    "animation photo événement",
    // Caractéristiques
    "photobooth personnalisé",
    "photos instantanées",
    "impression photos événement",
    // Géographiques
    "photobooth Belgique",
    "borne photo Wallonie",
    "photobooth Brabant wallon",
    // Longue traîne
    "location photobooth pour mariage",
    "prix location borne photo",
    "animation photobooth entreprise",
  ].join(', ')

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Borne Kébè - Location de Photobooth Professionnel Bruxelles',
      default: 'Location de Photobooth Professionnel à Bruxelles | Borne Kébè',
    },
    description: 'Location de photobooths haut de gamme pour mariages, événements professionnels et privés à Bruxelles. Photos instantanées, personnalisation complète, service premium.',
    keywords,
    openGraph: {
      type: 'website',
      locale: lang,
      url: `${baseUrl}/${lang}`,
      siteName: 'Borne Kébè - Location Photobooth Bruxelles',
      title: 'Location de Photobooth Professionnel à Bruxelles | Borne Kébè',
      description: 'Location de photobooths haut de gamme pour mariages et événements. Photos instantanées, personnalisation complète, service premium à Bruxelles.',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Borne Kébè Photobooth - Location de borne photo à Bruxelles',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Borne Kébè - Location de Photobooth Professionnel',
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