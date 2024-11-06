'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu } from "lucide-react"
import { useLang } from "@/context/LangContext"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
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
    contact: "Contact",
    menu: "Menu"
  },
  en: {
    home: "Home",
    features: "Services",
    pricing: "Pricing",
    contact: "Contact",
    menu: "Menu"
  },
  nl: {
    home: "Home",
    features: "Diensten",
    pricing: "Prijzen",
    contact: "Contact",
    menu: "Menu"
  }
} as const

export function Navbar() {
  const { lang, setLang } = useLang()
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Ajout d'une vérification pour s'assurer que la langue est valide
  const currentLang = (lang && translations[lang as keyof typeof translations]) ? lang : 'fr'
  const t = translations[currentLang as keyof typeof translations]

  // Gérer le montage du composant
  useEffect(() => {
    setMounted(true)
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === null) {
      localStorage.setItem('darkMode', 'true')
    } else {
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

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Ne rien rendre jusqu'au montage complet
  if (!mounted) {
    return null
  }

  const navigationLinks = [
    { href: "/", label: t.home },
    { href: "/features", label: t.features },
    { href: "/pricing", label: t.pricing },
    { href: "/contact", label: t.contact },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a0f2e] border-b border-gray-200 dark:border-[#2d1f42]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Borne-Kébè
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  isActive(link.href) 
                    ? 'text-primary dark:text-purple-400 font-semibold' 
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-primary dark:hover:text-purple-400 transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Select onValueChange={setLang} value={lang}>
              <SelectTrigger className="w-[60px]">
                <SelectValue>
                  <div className="flex items-center justify-center">
                    <Image
                      src={`/flags/${lang}.svg`}
                      alt={lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Nederlands'}
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/flags/fr.svg"
                      alt="Français"
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                    Français
                  </div>
                </SelectItem>
                <SelectItem value="en">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/flags/en.svg"
                      alt="English"
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                    English
                  </div>
                </SelectItem>
                <SelectItem value="nl">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/flags/nl.svg"
                      alt="Nederlands"
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                    Nederlands
                  </div>
                </SelectItem>
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

            {/* Menu burger amélioré */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 dark:hover:bg-[#2d1f42] transition-colors"
                  >
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{t.menu}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-full sm:w-80 bg-white/95 dark:bg-[#1a0f2e]/95 backdrop-blur-lg border-l border-gray-200 dark:border-[#2d1f42] p-0"
                >
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-200 dark:border-[#2d1f42]">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Borne-Kébè
                      </h2>
                    </div>
                    
                    <nav className="flex-1 overflow-y-auto py-6">
                      <div className="px-6 space-y-1">
                        {navigationLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={handleLinkClick}
                            className={`flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                              isActive(link.href)
                                ? 'bg-gray-100 dark:bg-[#2d1f42] text-primary dark:text-purple-400 font-semibold'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2d1f42]/50'
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </nav>

                    <div className="p-6 border-t border-gray-200 dark:border-[#2d1f42]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          © 2024 Borne-Kébè
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleDarkMode}
                          className="hover:bg-gray-100 dark:hover:bg-[#2d1f42]"
                        >
                          {darkMode ? 
                            <Sun className="h-5 w-5" /> : 
                            <Moon className="h-5 w-5" />
                          }
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 