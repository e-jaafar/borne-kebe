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

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const metadata = {
    fr: {
      title: 'Contact | Location Photobooth Bruxelles',
      description: 'Contactez Borne Kébè pour la location de votre photobooth à Bruxelles. Devis gratuit, conseil personnalisé pour votre événement.',
      keywords: 'contact photobooth, devis borne photo, location photobooth Bruxelles, réservation animation photo',
    },
    en: {
      title: 'Contact | Photobooth Rental Brussels',
      description: 'Contact Borne Kébè for your photobooth rental in Brussels. Free quote, personalized advice for your event.',
      keywords: 'photobooth contact, photo booth quote, photobooth rental Brussels, photo booth booking',
    },
    nl: {
      title: 'Contact | Photobooth Verhuur Brussel',
      description: 'Contacteer Borne Kébè voor uw photobooth verhuur in Brussel. Gratis offerte, persoonlijk advies voor uw evenement.',
      keywords: 'photobooth contact, fotohokje offerte, photobooth verhuur Brussel, fotohokje reservering',
    },
  }

  return metadata[lang as keyof typeof metadata] || metadata.fr
} 