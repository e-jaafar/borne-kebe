'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import { Phone, Mail, MapPin, MessageCircle, } from 'lucide-react'
import { translations } from '@/translations'
import { motion } from 'framer-motion'

// Définition du type pour les boutons
type ActionButton = {
  icon: typeof Phone | typeof Mail | typeof MapPin | typeof MessageCircle;
  href: string;
  label: string;
  color: string;
  bgColor: string;
  notifications?: boolean;
}

const actionButtons: Record<string, ActionButton[]> = {
  fr: [
    {
      icon: Phone,
      href: "tel:+32488952150",
      label: "Appeler",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10 dark:bg-green-400/10"
    },
    {
      icon: Mail,
      href: "mailto:alchimistelab@hotmail.com",
      label: "Email",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-400/10"
    },
    {
      icon: MapPin,
      href: "https://maps.google.com/?q=Rue+saint+michel+5+1000+Bruxelles",
      label: "Adresse",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10 dark:bg-red-400/10"
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/+32488952150",
      label: "WhatsApp",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10 dark:bg-green-400/10"
    }
  ],
}

export function MobileNav() {
  const { lang } = useLang()
  const pathname = usePathname()
  const currentLang = (lang && translations[lang as keyof typeof translations]) ? lang : 'fr'
  const buttons = actionButtons[currentLang as keyof typeof actionButtons]

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="bg-white/80 dark:bg-[#1a0f2e]/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-4 h-16">
            {buttons.map((button, index) => {
              const Icon = button.icon
              const isActive = pathname === button.href

              return (
                <Link 
                  key={index}
                  href={button.href}
                  className="relative group"
                  target={button.href.startsWith('http') ? '_blank' : undefined}
                  rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="flex flex-col items-center justify-center h-16 relative">
                    {/* Fond animé au hover/active */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0.6,
                        opacity: isActive ? 1 : 0
                      }}
                      className={`absolute inset-0 m-2 rounded-xl ${button.bgColor}`}
                    />

                    {/* Conteneur de l'icône avec animation */}
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10"
                    >
                      <Icon className={`h-6 w-6 ${button.color} transition-transform duration-200`} />
                    </motion.div>

                    {/* Label avec animation */}
                    <motion.span 
                      initial={{ opacity: 0.5, y: 5 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className={`text-xs font-medium ${button.color} mt-1`}
                    >
                      {button.label}
                    </motion.span>

                    {/* Indicateur de notification (si nécessaire) */}
                    {button.notifications && (
                      <span className="absolute top-3 right-1/4 h-2 w-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 