'use client'

import Link from 'next/link'
import { useLang } from '@/context/LangContext'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const actionButtons = {
  fr: [
    {
      icon: Phone,
      href: "tel:+32488952150",
      label: "Appeler",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Mail,
      href: "mailto:alchimistelab@hotmail.com",
      label: "Email",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: MapPin,
      href: "https://maps.google.com/?q=Rue+saint+michel+5+1000+Bruxelles",
      label: "Adresse",
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Clock,
      href: "#",
      label: "Dispo",
      color: "text-purple-600 dark:text-purple-400"
    }
  ],
  en: [
    {
      icon: Phone,
      href: "tel:+32488952150",
      label: "Appeler",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Mail,
      href: "mailto:alchimistelab@hotmail.com",
      label: "Email",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: MapPin,
      href: "https://maps.google.com/?q=Rue+saint+michel+5+1000+Bruxelles",
      label: "Adresse",
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Clock,
      href: "#",
      label: "Available",
      color: "text-purple-600 dark:text-purple-400"
    }
  ],
  nl: [
    {
      icon: Phone,
      href: "tel:+32488952150",
      label: "Appeler",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Mail,
      href: "mailto:alchimistelab@hotmail.com",
      label: "Email",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: MapPin,
      href: "https://maps.google.com/?q=Rue+saint+michel+5+1000+Bruxelles",
      label: "Adresse",
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Clock,
      href: "#",
      label: "Beschikbaar",
      color: "text-purple-600 dark:text-purple-400"
    }
  ]
}

export function MobileNav() {
  const { lang } = useLang()
  const currentLang = (lang && actionButtons[lang as keyof typeof actionButtons]) ? lang : 'fr'
  const buttons = actionButtons[currentLang as keyof typeof actionButtons]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a0f2e] border-t border-gray-200 dark:border-[#2d1f42] md:hidden z-[100]">
      <div className="flex justify-around py-2">
        {buttons.map((button, index) => {
          const Icon = button.icon
          return (
            <Link 
              key={index}
              href={button.href}
              className="flex flex-col items-center p-2"
              target={button.href.startsWith('http') ? '_blank' : undefined}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <Icon className={`h-6 w-6 ${button.color} mb-1`} />
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {button.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 