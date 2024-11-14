'use client'

import Link from "next/link"
import { useLang } from "@/context/LangContext"
import { Mail, Phone, MapPin, Clock, Heart } from "lucide-react"
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
    about: "À propos",
    legal: {
      title: "Légal",
      privacy: {
        title: "Politique de confidentialité",
        content: [
          "Introduction",
          "Cette politique de confidentialité décrit comment Borne Kébè collecte, utilise et protège vos données personnelles.",
          "Données collectées",
          "Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services : nom, email, photos prises lors des événements.",
          "Utilisation des données",
          "Vos données sont utilisées uniquement pour fournir nos services et sont supprimées après 30 jours.",
          "Protection des données",
          "Nous utilisons des mesures de sécurité avancées pour protéger vos données personnelles."
        ]
      },
      terms: {
        title: "Conditions d'utilisation",
        content: [
          "Acceptation des conditions",
          "En utilisant nos services, vous acceptez nos conditions d'utilisation.",
          "Services proposés",
          "Location de photobooths pour événements avec personnel qualifié.",
          "Responsabilités",
          "Nous nous engageons à fournir un service de qualité et à protéger vos données.",
          "Limitations",
          "Notre responsabilité est limitée au montant de la prestation."
        ]
      },
      cookies: {
        title: "Politique des cookies",
        content: [
          "Utilisation des cookies",
          "Nous utilisons des cookies pour améliorer votre expérience.",
          "Types de cookies",
          "Cookies essentiels pour le fonctionnement du site.",
          "Cookies analytiques pour comprendre l'utilisation.",
          "Gestion des cookies",
          "Vous pouvez gérer vos préférences de cookies à tout moment."
        ]
      }
    }
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
    about: "About",
    legal: {
      title: "Legal",
      privacy: {
        title: "Privacy Policy",
        content: [
          "Introduction",
          "This privacy policy describes how Borne Kébè collects, uses and protects your personal data.",
          "Data collected",
          "We only collect data necessary for our services: name, email, photos taken during events.",
          "Data usage",
          "Your data is only used to provide our services and is deleted after 30 days.",
          "Data protection",
          "We use advanced security measures to protect your personal data."
        ]
      },
      terms: {
        title: "Terms of Use",
        content: [
          "Terms acceptance",
          "By using our services, you accept our terms of use.",
          "Services offered",
          "Photobooth rental for events with qualified staff.",
          "Responsibilities",
          "We commit to providing quality service and protecting your data.",
          "Limitations",
          "Our liability is limited to the amount of the service."
        ]
      },
      cookies: {
        title: "Cookie Policy",
        content: [
          "Cookie usage",
          "We use cookies to improve your experience.",
          "Cookie types",
          "Essential cookies for site operation.",
          "Analytical cookies to understand usage.",
          "Cookie management",
          "You can manage your cookie preferences at any time."
        ]
      }
    }
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
    about: "Over ons",
    legal: {
      title: "Juridisch",
      privacy: {
        title: "Privacybeleid",
        content: [
          "Introductie",
          "Dit privacybeleid beschrijft hoe Borne Kébè uw persoonlijke gegevens verzamelt, gebruikt en beschermt.",
          "Verzamelde gegevens",
          "We verzamelen alleen gegevens die nodig zijn voor onze diensten: naam, e-mail, foto's gemaakt tijdens evenementen.",
          "Gebruik van gegevens",
          "Uw gegevens worden alleen gebruikt om onze diensten te leveren en worden na 30 dagen verwijderd.",
          "Gegevensbescherming",
          "We gebruiken geavanceerde beveiligingsmaatregelen om uw persoonlijke gegevens te beschermen."
        ]
      },
      terms: {
        title: "Gebruiksvoorwaarden",
        content: [
          "Acceptatie voorwaarden",
          "Door gebruik te maken van onze diensten, accepteert u onze gebruiksvoorwaarden.",
          "Aangeboden diensten",
          "Verhuur van photobooths voor evenementen met gekwalificeerd personeel.",
          "Verantwoordelijkheden",
          "Wij verplichten ons tot het leveren van kwaliteitsdiensten en het beschermen van uw gegevens.",
          "Beperkingen",
          "Onze aansprakelijkheid is beperkt tot het bedrag van de dienst."
        ]
      },
      cookies: {
        title: "Cookiebeleid",
        content: [
          "Gebruik van cookies",
          "We gebruiken cookies om uw ervaring te verbeteren.",
          "Soorten cookies",
          "Essentiële cookies voor de werking van de site.",
          "Analytische cookies om gebruik te begrijpen.",
          "Cookie-beheer",
          "U kunt uw cookievoorkeuren op elk moment beheren."
        ]
      }
    }
  }
}

export function Footer() {
  const { lang } = useLang()
  const currentLang = (lang && translations[lang as keyof typeof translations]) ? lang : 'fr'
  const t = translations[currentLang as keyof typeof translations]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 pt-16 pb-8">
        {/* Logo et Description */}
        <div className="space-y-4">
          <Link 
            href={`/${lang}`}
            className="inline-block text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Borne Kébè
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Solutions de photobooth haut de gamme pour vos événements
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-foreground font-semibold text-lg mb-4">
            {t.links}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link 
                href={`/${lang}/features`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.services}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/pricing`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.pricing}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/contact`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
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

        {/* Légal */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">
            {t.legal.title}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link 
                href={`/${lang}/privacy`}
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {t.legal.privacy.title}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/terms`}
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {t.legal.terms.title}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/cookies`}
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {t.legal.cookies.title}
              </Link>
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
    </footer>
  )
} 