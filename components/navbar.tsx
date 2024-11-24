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
import { useRouter } from "next/navigation"
import { useTheme } from '@/components/ThemeProvider'
import { languages, type Lang } from '@/config/i18n'
import { translations } from '@/translations'
import { motion, useScroll, useTransform } from "framer-motion"

const defaultTranslations = {
  nav: {
    home: "Home",
    features: "Services",
    pricing: "Pricing",
    contact: "Contact",
    menu: "Menu"
  }
}

// Définir les langues valides
const validLanguages = ['fr', 'en', 'nl'] as const
type ValidLang = typeof validLanguages[number]

// Extraire la langue de l'URL avec une valeur par défaut
const getValidLang = (path: string | null): ValidLang => {
  const urlLang = (path?.split('/')[1] || 'fr') as string
  return validLanguages.includes(urlLang as ValidLang) 
    ? (urlLang as ValidLang) 
    : 'fr'
}

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLang()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0.5, 0.95]
  )

  const navStyle = {
    backgroundColor: theme === 'dark' 
      ? `rgba(26, 15, 46, ${navOpacity.get()})`
      : `rgba(255, 255, 255, ${navOpacity.get()})`
  }

  // Utiliser la nouvelle fonction
  const urlLang = getValidLang(pathname)
  const currentPath = pathname?.split('/').slice(2).join('/') || ''

  // Gestion sécurisée des traductions avec vérification complète
  const getTranslations = () => {
    try {
      if (!urlLang || !translations[urlLang]) {
        return defaultTranslations.nav
      }
      return translations[urlLang].nav || defaultTranslations.nav
    } catch (error) {
      console.error('Error loading translations:', error)
      return defaultTranslations.nav
    }
  }

  const t = getTranslations()

  // Définir les liens de navigation avec les traductions sécurisées
  const navigationLinks = [
    { href: `/${urlLang}`, label: t.home },
    { href: `/${urlLang}/features`, label: t.features },
    { href: `/${urlLang}/pricing`, label: t.pricing },
    { href: `/${urlLang}/contact`, label: t.contact },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (languages.includes(urlLang as Lang)) {
      setLang(urlLang)
      localStorage.setItem('preferred-lang', urlLang)
    }
  }, [pathname, setLang, urlLang])

  const handleLanguageChange = (newLang: Lang) => {
    const newPathname = `/${newLang}/${currentPath}`
    router.push(newPathname)
  }

  const handleLinkClick = () => setIsOpen(false)

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Ne rendre la navbar que côté client
  if (!mounted) {
    return null // ou un placeholder/skeleton
  }

  // Ajoutez une vérification de sécurité
  const menuText = translations?.[urlLang]?.nav?.menu || 'Menu'

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-lg"
      style={navStyle}
    >
      {/* Indicateur de progression */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo avec animation */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href={`/${lang}`}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              Borne Kébè
            </Link>
          </motion.div>

          {/* Navigation desktop améliorée */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`relative text-sm ${
                    pathname === link.href 
                      ? 'text-primary dark:text-purple-400 font-semibold' 
                      : 'text-gray-600 dark:text-gray-300'
                  } hover:text-primary dark:hover:text-purple-400 transition-colors`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary dark:bg-purple-400"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {mounted && (
            <div className="flex items-center space-x-4">
              {/* Sélecteur de langue amélioré */}
              <Select
                value={urlLang}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className="w-[52px] h-[40px] p-0 pl-2 bg-transparent border-gray-200/50 dark:border-gray-800/50 border-none hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors backdrop-blur-lg focus:outline-none">
                  <SelectValue>
                    <motion.div 
                      className="flex items-center justify-center w-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {validLanguages.includes(urlLang as ValidLang) && (
                        <Image
                          src={`/flags/${urlLang}.svg`}
                          alt={urlLang === 'fr' ? 'Français' : urlLang === 'en' ? 'English' : 'Nederlands'}
                          width={24}
                          height={24}
                          className="rounded-sm w-6 h-6"
                        />
                      )}
                    </motion.div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-gray-200/50 dark:border-gray-800/50">
                  <SelectItem value="fr">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/flags/fr.svg"
                        alt="Français"
                        width={24}
                        height={24}
                        className="rounded-sm w-6 h-6"
                      />
                      <span>Français</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/flags/en.svg"
                        alt="English"
                        width={24}
                        height={24}
                        className="rounded-sm w-6 h-6"
                      />
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="nl">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/flags/nl.svg"
                        alt="Nederlands"
                        width={24}
                        height={24}
                        className="rounded-sm w-6 h-6"
                      />
                      <span>Nederlands</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Bouton thème amélioré */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleThemeToggle}
                  className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors backdrop-blur-lg"
                >
                  {theme === 'dark' ? 
                    <Sun className="h-5 w-5 text-yellow-500" /> : 
                    <Moon className="h-5 w-5 text-purple-600" />
                  }
                </Button>
              </motion.div>
            </div>
          )}

          {/* Menu mobile amélioré */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors backdrop-blur-lg"
                  >
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{menuText}</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-80 bg-white/95 dark:bg-[#1a0f2e]/95 backdrop-blur-lg border-l border-gray-200/50 dark:border-gray-800/50 p-0"
              >
                <motion.div 
                  className="flex flex-col h-full"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* En-tête du menu */}
                  <motion.div 
                    className="p-6 border-b border-gray-200/50 dark:border-gray-800/50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      href={`/${lang}`}
                      onClick={() => setIsOpen(false)}
                      className="inline-block"
                    >
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                        Borne-Kébè
                      </h2>
                    </Link>
                  </motion.div>
                  
                  {/* Navigation */}
                  <nav className="flex-1 overflow-y-auto py-6">
                    <div className="px-6 space-y-2">
                      {navigationLinks.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            onClick={handleLinkClick}
                            className={`flex items-center w-full py-3 px-4 rounded-lg transition-all duration-300 ${
                              pathname === link.href
                                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold transform scale-105'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                            }`}
                          >
                            {link.label}
                            {pathname === link.href && (
                              <motion.div
                                className="ml-auto text-purple-600 dark:text-purple-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              >
                                •
                              </motion.div>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </nav>

                  {/* Sélecteur de langue */}
                  <motion.div
                    className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-800/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-4">
                      {['fr', 'en', 'nl'].map((l) => (
                        <motion.button
                          key={l}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            handleLanguageChange(l as Lang)
                            setIsOpen(false)
                          }}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            urlLang === l 
                              ? 'bg-purple-50 dark:bg-purple-900/20' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
                          }`}
                        >
                          <Image
                            src={`/flags/${l}.svg`}
                            alt={l === 'fr' ? 'Français' : l === 'en' ? 'English' : 'Nederlands'}
                            width={24}
                            height={24}
                            className="rounded-sm w-6 h-6"
                          />
                          <span className={`text-sm ${
                            urlLang === l 
                              ? 'text-purple-600 dark:text-purple-400 font-medium' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {l.toUpperCase()}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Pied de page */}
                  <motion.div 
                    className="p-6 border-t border-gray-200/50 dark:border-gray-800/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        © 2024 Borne-Kébè
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleThemeToggle}
                          className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                        >
                          {theme === 'dark' ? 
                            <Sun className="h-5 w-5 text-yellow-500" /> : 
                            <Moon className="h-5 w-5 text-purple-600" />
                          }
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 