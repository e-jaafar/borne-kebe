'use client'

import Link from "next/link"
import { useLang } from "@/context/LangContext"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Heart } from "lucide-react"
import { motion } from "framer-motion"

const translations = {
  fr: {
    copyright: "Tous droits réservés",
    developedBy: "Développé avec",
    by: "par",
    contact: "Contact",
    address: "Adresse",
    schedule: "Horaires",
    followUs: "Suivez-nous",
    links: "Navigation",
    services: "Services",
    pricing: "Tarifs",
    about: "À propos"
  },
  en: {
    copyright: "All rights reserved",
    developedBy: "Developed with",
    by: "by",
    contact: "Contact",
    address: "Address",
    schedule: "Schedule",
    followUs: "Follow us",
    links: "Navigation",
    services: "Services",
    pricing: "Pricing",
    about: "About"
  },
  nl: {
    copyright: "Alle rechten voorbehouden",
    developedBy: "Ontwikkeld met",
    by: "door",
    contact: "Contact",
    address: "Adres",
    schedule: "Openingstijden",
    followUs: "Volg ons",
    links: "Navigatie",
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
    <footer className="relative w-full bg-gradient-to-b from-white to-gray-50 dark:from-[#1a0f2e] dark:to-[#140b24] border-t border-gray-200 dark:border-gray-800">
      {/* Effet de vague décoratif amélioré */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ligne gradient supérieure */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        
        {/* Première vague */}
        <svg
          className="absolute top-0 left-0 right-0 w-full opacity-[0.07] transform translate-y-[-50%]"
          height="120"
          viewBox="0 0 1920 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C320,80 640,120 960,120 C1280,120 1600,80 1920,0 L1920,-10 L0,-10 Z"
            fill="currentColor"
            className="text-purple-500 dark:text-purple-400"
          >
            <animate
              attributeName="d"
              dur="5s"
              repeatCount="indefinite"
              values="
                M0,0 C320,80 640,120 960,120 C1280,120 1600,80 1920,0 L1920,-10 L0,-10 Z;
                M0,0 C320,120 640,80 960,120 C1280,80 1600,120 1920,0 L1920,-10 L0,-10 Z;
                M0,0 C320,80 640,120 960,120 C1280,120 1600,80 1920,0 L1920,-10 L0,-10 Z
              "
            />
          </path>
        </svg>

        {/* Deuxième vague (plus petite et décalée) */}
        <svg
          className="absolute top-0 left-0 right-0 w-full opacity-[0.05] transform translate-y-[-30%]"
          height="100"
          viewBox="0 0 1920 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C480,60 960,100 1440,100 C1920,100 1920,60 1920,0 L1920,-10 L0,-10 Z"
            fill="currentColor"
            className="text-purple-600 dark:text-purple-500"
          >
            <animate
              attributeName="d"
              dur="7s"
              repeatCount="indefinite"
              values="
                M0,0 C480,60 960,100 1440,100 C1920,100 1920,60 1920,0 L1920,-10 L0,-10 Z;
                M0,0 C480,100 960,60 1440,100 C1920,60 1920,100 1920,0 L1920,-10 L0,-10 Z;
                M0,0 C480,60 960,100 1440,100 C1920,100 1920,60 1920,0 L1920,-10 L0,-10 Z
              "
            />
          </path>
        </svg>

        {/* Effet de brillance */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-purple-500/5 to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 pt-16 pb-8 md:pb-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Section Logo et Description */}
          <div className="space-y-4">
            <Link 
              href={`/${lang}`}
              className="inline-block text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              Borne Kébè
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Solutions de photobooth haut de gamme pour vos événements professionnels et privés.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Section Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">
              {t.links}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={`/${lang}/features`}
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {t.services}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${lang}/pricing`}
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {t.pricing}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${lang}/contact`}
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">
              {t.contact}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:alchimistelab@hotmail.com"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>alchimistelab@hotmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+32488952150"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+32 488 95 21 50</span>
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Rue saint michel 5, 1000 Bruxelles</span>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Lun-Ven: 9h-18h</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright et Signature */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-16 md:mb-0">
            <div>
              © {currentYear} Borne Kébè - {t.copyright}
            </div>
            <div className="flex items-center space-x-1">
              <span>{t.developedBy}</span>
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                className="text-red-500 dark:text-red-400 mx-1"
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.div>
              <span>{t.by}</span>
              <Link 
                href={`https://www.linkedin.com/in/jaafar-el/`}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium ml-1"
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