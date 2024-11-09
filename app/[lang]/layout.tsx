import { isValidLang, languages } from '@/config/i18n'
import { notFound } from 'next/navigation'
import { Analytics } from "@vercel/analytics/react"
import { SchemaOrg } from '@/components/SchemaOrg'
import { Metadata } from 'next'

type LayoutProps = {
  children: React.ReactNode
  params: { lang: string }
}

const domains = {
  main: 'https://www.xn--borne-kb-80ai.com',
  alt: 'https://www.borne-kebe.com'
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

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const ogImage = {
    url: `${domains.main}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: 'Borne Kébè Photobooth'
  }

  return {
    title: "Borne Kébè | Location de Photobooth Professionnel",
    description: "Location de photobooths haut de gamme pour vos événements professionnels et privés. Qualité studio, partage instantané et personnalisation complète.",
    keywords: "photobooth, borne photo, événement, mariage, soirée entreprise, photo booth, animation événementielle",
    openGraph: {
      title: "Borne Kébè | Location de Photobooth Professionnel",
      description: "Location de photobooths haut de gamme pour vos événements",
      images: [
        ogImage,
        {
          ...ogImage,
          url: `${domains.alt}/og-image.jpg`
        }
      ],
      locale: 'fr_FR',
      type: 'website',
      url: domains.main,
      siteName: 'Borne Kébè'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Borne Kébè | Location de Photobooth Professionnel',
      description: 'Location de photobooths haut de gamme pour vos événements',
      images: [ogImage.url],
    },
    alternates: {
      canonical: `${domains.main}/${lang}`,
      languages: {
        ...Object.fromEntries(
          languages.map(l => [l, `${domains.main}/${l}`])
        ),
        ...Object.fromEntries(
          languages.map(l => [l, `${domains.alt}/${l}`])
        )
      }
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