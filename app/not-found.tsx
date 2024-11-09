'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const translations = {
  fr: {
    title: "Page non trouvée",
    subtitle: "Désolé, la page que vous recherchez n'existe pas.",
    home: "Retour à l'accueil",
    back: "Retour en arrière"
  },
  en: {
    title: "Page not found",
    subtitle: "Sorry, the page you are looking for does not exist.",
    home: "Back to home",
    back: "Go back"
  },
  nl: {
    title: "Pagina niet gevonden",
    subtitle: "Sorry, de pagina die u zoekt bestaat niet.",
    home: "Terug naar home",
    back: "Ga terug"
  }
}

export default function NotFound() {
  const router = useRouter()
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations] || translations.fr

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-[#1a0f2e] dark:to-[#140b24]">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] -bottom-20 -left-20 bg-purple-700/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Effet de brillance - Déplacé avant le contenu et avec z-index plus bas */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-10"
      />

      {/* Contenu principal avec z-index plus élevé */}
      <div className="relative z-20 text-center px-4">
        {/* Nombre 404 animé */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[150px] font-bold leading-none bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Texte animé */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 group relative"
          >
            <Link href={`/${lang}`}>
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              {t.home}
            </Link>
          </Button>

          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 group relative"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.back}
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 