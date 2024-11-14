'use client'

import Link from "next/link"
import { useLang } from "@/context/LangContext"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Heart } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

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
    <footer className="relative w-full bg-gradient-to-b from-background to-background/95 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Grille principale avec alignement centré sur mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo et Description - centré sur mobile */}
          <div className="space-y-6 text-center md:text-left">
            <Link 
              href={`/${lang}`}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
              >
                Borne Kébè
              </motion.div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Solutions de photobooth haut de gamme pour vos événements professionnels et privés. Qualité studio, partage instantané et personnalisation complète.
            </p>
          </div>

          {/* Navigation - déjà centré sur mobile */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground">
              {t.links}
            </h3>
            <nav className="flex flex-col items-center md:items-start space-y-4">
              <Link 
                href={`/${lang}/features`}
                className="text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {t.services}
              </Link>
              <Link 
                href={`/${lang}/pricing`}
                className="text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {t.pricing}
              </Link>
              <Link 
                href={`/${lang}/contact`}
                className="text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {t.contact}
              </Link>
            </nav>
          </div>

          {/* Contact - maintenant centré sur mobile */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground">
              {t.contact}
            </h3>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              <motion.li whileHover={{ x: 2 }}>
                <a 
                  href="mailto:alchimistelab@hotmail.com"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </span>
                  <span>alchimistelab@hotmail.com</span>
                </a>
              </motion.li>
              <li>
                <a 
                  href="tel:+32488952150"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </span>
                  <span>+32 488 95 21 50</span>
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-4 h-4 text-primary" />
                  </span>
                  <span>Rue saint michel 5, 1000 Bruxelles</span>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Clock className="w-4 h-4 text-primary" />
                  </span>
                  <span>Lun-Ven: 9h-18h</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Légal - déjà centré sur mobile */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground">
              {t.legal.title}
            </h3>
            <nav className="flex flex-col items-center md:items-start space-y-4">
              <Link 
                href={`/${lang}/privacy`}
                className="text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {t.legal.privacy.title}
              </Link>
              <Link 
                href={`/${lang}/terms`}
                className="text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {t.legal.terms.title}
              </Link>
              <Link 
                href={`/${lang}/cookies`}
                className="text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {t.legal.cookies.title}
              </Link>
            </nav>
          </div>
        </div>

        {/* Séparateur */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Copyright et Signature - centré sur mobile */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center md:text-left">
            © {currentYear} Borne Kébè - {t.copyright}
          </p>
          <div className="flex items-center space-x-1">
            <span>{t.developedBy}</span>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="text-red-500 dark:text-red-400 mx-1"
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
            <span>{t.by}</span>
            <Link 
              href="https://www.linkedin.com/in/jaafar-el/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium ml-1 transition-colors"
            >
              Jaafar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
