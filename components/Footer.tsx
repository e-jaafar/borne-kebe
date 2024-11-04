'use client'

import Link from "next/link"
import { useLang } from "@/context/LangContext"

const translations = {
  fr: {
    copyright: "Tous droits réservés",
    developedBy: "Développé par"
  },
  en: {
    copyright: "All rights reserved",
    developedBy: "Developed by"
  }
}

export function Footer() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-6 bg-white dark:bg-[#1a0f2e] border-t border-gray-200 dark:border-[#2d1f42]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            © {currentYear} Last Task Unit - {t.copyright}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {t.developedBy}{" "}
            <Link 
              href="https://github.com/e-jaafar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Jaafar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 