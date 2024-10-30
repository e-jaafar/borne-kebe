'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useLang } from "@/context/LangContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const translations = {
  fr: {
    home: "Accueil",
    features: "Services",
    pricing: "Tarifs",
    contact: "Contact"
  },
  en: {
    home: "Home",
    features: "Services",
    pricing: "Pricing",
    contact: "Contact"
  }
}

export function Navbar() {
  const { lang, setLang } = useLang()
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()
  const t = translations[lang as keyof typeof translations]

  // Gérer le montage du composant
  useEffect(() => {
    setMounted(true)
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }
  }, [darkMode, mounted])

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Ne rien rendre jusqu'au montage complet
  if (!mounted) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a0f2e] border-b border-gray-200 dark:border-[#2d1f42]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Smarthebooth
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className={`text-sm ${
                isActive('/') 
                  ? 'text-primary dark:text-purple-400 font-semibold' 
                  : 'text-gray-600 dark:text-gray-300'
              } hover:text-primary dark:hover:text-purple-400 transition-colors`}
            >
              {t.home}
            </Link>
            <Link 
              href="/features"
              className={`text-sm ${isActive('/features') ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300'} hover:text-primary transition-colors`}
            >
              {t.features}
            </Link>
            <Link 
              href="/pricing"
              className={`text-sm ${isActive('/pricing') ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300'} hover:text-primary transition-colors`}
            >
              {t.pricing}
            </Link>
            <Link 
              href="/contact"
              className={`text-sm ${isActive('/contact') ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300'} hover:text-primary transition-colors`}
            >
              {t.contact}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Select onValueChange={(value) => setLang(value)} defaultValue={lang}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDarkMode}
              className="border-gray-200 dark:border-[#2d1f42] dark:hover:border-purple-500"
              aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 