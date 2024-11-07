'use client'

import Link from "next/link"
import { useLang } from "@/context/LangContext"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react"

const translations = {
  fr: {
    copyright: "Tous droits réservés",
    developedBy: "Développé par",
    contact: "Contact",
    address: "Adresse",
    schedule: "Horaires",
    followUs: "Suivez-nous",
    links: "Liens rapides",
    services: "Services",
    pricing: "Tarifs",
    about: "À propos"
  },
  en: {
    copyright: "All rights reserved",
    developedBy: "Developed by",
    contact: "Contact",
    address: "Address",
    schedule: "Schedule",
    followUs: "Follow us",
    links: "Quick links",
    services: "Services",
    pricing: "Pricing",
    about: "About"
  },
  nl: {
    copyright: "Alle rechten voorbehouden",
    developedBy: "Ontwikkeld door",
    contact: "Contact",
    address: "Adres",
    schedule: "Openingstijden",
    followUs: "Volg ons",
    links: "Snelle links",
    services: "Diensten",
    pricing: "Prijzen",
    about: "Over ons"
  }
}

export function Footer() {
  const { lang } = useLang()
  const currentLang = (lang && translations[lang as keyof typeof translations]) ? lang : 'fr'
  const t = translations[currentLang as keyof typeof translations]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-white dark:bg-[#1a0f2e] border-t border-gray-200 dark:border-gray-800 mb-16 md:mb-0 pt-12 pb-6">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.contact}</h3>
            <div className="space-y-3">
              <a href="mailto:alchimistelab@hotmail.com" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>alchimistelab@hotmail.com</span>
              </a>
              <a href="tel:+32488952150" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+32 488 95 21 50</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.address}</h3>
            <div className="space-y-3">
              <a href="https://maps.google.com/?q=Rue+saint+michel+5+1000+Bruxelles" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Rue saint michel 5, 1000 Bruxelles</span>
              </a>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>Lun-Ven: 9h-18h</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.links}</h3>
            <div className="space-y-3">
              <Link href={`/${lang}/features`} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                {t.services}
              </Link>
              <Link href={`/${lang}/pricing`} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                {t.pricing}
              </Link>
              <Link href={`/${lang}/contact`} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                {t.contact}
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.followUs}</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              © {currentYear} Last Task Unit - {t.copyright}
            </div>
            <div>
              {t.developedBy}{" "}
              <Link 
                href={`/${lang}/contact`}
                className="text-primary dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                Jaafar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 