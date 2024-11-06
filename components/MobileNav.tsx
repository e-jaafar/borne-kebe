'use client'

import Link from "next/link"
import { Phone, Calculator, Mail, MessageCircle } from "lucide-react"
import { useLang } from "@/context/LangContext"

const translations = {
  fr: {
    call: "Appeler",
    pricing: "Tarifs",
    contact: "Contact",
    whatsapp: "WhatsApp"
  },
  en: {
    call: "Call",
    pricing: "Pricing",
    contact: "Contact",
    whatsapp: "WhatsApp"
  },
  nl: {
    call: "Bellen",
    pricing: "Prijzen",
    contact: "Contact",
    whatsapp: "WhatsApp"
  }
}

export function MobileNav() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#1a0f2e]/80 backdrop-blur-lg border-t border-gray-200 dark:border-[#2d1f42] md:hidden z-50">
      <div className="grid grid-cols-4 gap-1 p-2">
        <a 
          href="tel:+32488952150" 
          className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
        >
          <Phone className="h-6 w-6" />
          <span className="text-xs mt-1">{t.call}</span>
        </a>
        
        <Link 
          href="/pricing"
          className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
        >
          <Calculator className="h-6 w-6" />
          <span className="text-xs mt-1">{t.pricing}</span>
        </Link>
        
        <Link 
          href="/contact"
          className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
        >
          <Mail className="h-6 w-6" />
          <span className="text-xs mt-1">{t.contact}</span>
        </Link>
        
        <a 
          href="https://wa.me/32488952150"
          target="_blank"
          rel="noopener noreferrer" 
          className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs mt-1">{t.whatsapp}</span>
        </a>
      </div>
    </div>
  )
} 