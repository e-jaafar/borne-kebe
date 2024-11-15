'use client'

import { Camera, Share2, Smartphone, Palette, Cloud, Shield, Printer, Users } from "lucide-react"
import { Sparkles } from "lucide-react"
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { translations } from '@/translations'

type FeaturesPageProps = {
  translations: typeof translations[keyof typeof translations]
}

// Mapping des noms d'icônes vers les composants
const iconComponents = {
  Camera,
  Share2,
  Smartphone,
  Palette,
  Cloud,
  Shield,
  Printer,
  Users
} as const

// Type pour le mapping des icônes
type IconName = keyof typeof iconComponents

export function FeaturesPage({ translations: t }: FeaturesPageProps) {
  const { lang } = useLang()
  const currentFeatures = t.features.items

  // Fonction pour obtenir le composant d'icône
  const getIconComponent = (iconName: string) => {
    return iconComponents[iconName as IconName] || Camera // Camera comme fallback
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-24 lg:py-32 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium text-foreground">
              {t.features.subtitle}
            </span>
          </div>
          <h1 className="text-foreground text-5xl font-bold tracking-tight mb-6">
            {t.features.title}
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentFeatures.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[200px] hover:h-[320px] rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-500"
              >
                {/* Effet de bac de développement amélioré */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                
                {/* Nouveau : Effet de lumière dynamique */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 -skew-x-12 animate-light-sweep" />
                </div>

                {/* Effet de liquide de développement amélioré */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-red-500/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-[1.5s] ease-in-out">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]" />
                </div>

                {/* Contenu initial */}
                <div className="relative p-6 h-full flex flex-col">
                  {/* Icône améliorée - ajustement de la marge et de la taille */}
                  <div className="relative mb-6 group-hover:scale-90 transition-transform duration-200">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-50 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center backdrop-blur-sm">
                      <IconComponent className="w-5 h-5 text-white group-hover:rotate-[360deg] transition-transform duration-700" />
                      <div className="absolute inset-0 rounded-full border border-primary/50 group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-1 rounded-full border border-primary/30 group-hover:scale-125 transition-transform duration-700" />
                    </div>
                  </div>

                  {/* Point lumineux repositionné */}
                  <div className="absolute right-4 top-4 w-3 h-3 rounded-full bg-white/60 blur-[1px] group-hover:scale-150 transition-transform duration-700" />

                  {/* Titre et description avec ajustement de l'espacement */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:opacity-0 transition-all duration-75 group-hover:-translate-y-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:opacity-0 transition-all duration-75 group-hover:-translate-y-2 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Contenu révélé amélioré */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                  <div className="relative">
                    <h3 className="text-lg font-semibold mb-4 text-red-400 dark:text-red-300 opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100 group-hover:translate-y-0 translate-y-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/90 leading-relaxed text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 delay-150 group-hover:translate-y-0 translate-y-4">
                      {feature.details}
                    </p>

                    {/* Marques de développement améliorées */}
                    <div className="absolute -right-2 top-0 flex flex-col gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-3 bg-red-500/30 rounded-full group-hover:translate-x-0 translate-x-4 transition-transform"
                          style={{ 
                            opacity: 0.3 - i * 0.1,
                            transitionDelay: `${i * 100}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Effet de grain photo amélioré */}
                <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none group-hover:opacity-[0.25] transition-opacity duration-700" />

                {/* Bordure de négatif améliorée */}
                <div className="absolute -right-3 top-0 bottom-0 w-6 flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:translate-x-0 translate-x-4">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 bg-red-500/40 transition-all duration-500"
                      style={{
                        width: i % 2 === 0 ? '16px' : '12px',
                        opacity: 0.4 - (i * 0.02),
                        transitionDelay: `${i * 50}ms`
                      }}
                    />
                  ))}
                </div>

                {/* Flash photo amélioré */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-transparent opacity-0 group-hover:animate-photo-flash pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 