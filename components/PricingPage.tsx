'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeIn } from '@/components/ui/motion'
import { motion } from 'framer-motion'
import { type PricingTranslations } from '@/types/translations'

interface PricingPageProps {
  translations: PricingTranslations
}

export function PricingPage({ translations: t }: PricingPageProps) {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50 dark:from-[#140b24] dark:via-[#1a0f2e] dark:to-[#140b24]">
      {/* Effets de fond décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-700/5 rounded-full blur-3xl" />
      </div>

      {/* Contenu de la page */}
      <div className="relative z-10">
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center py-20">
          <div className="container relative mx-auto max-w-7xl px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    {t.pricing.subtitle}
                  </span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {t.pricing.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {t.pricing.subtitle}
                </p>
              </div>
            </FadeIn>

            {/* Grille des plans */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto pt-4">
              {t.pricing.plans.map((plan, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={cn(
                      "flex flex-col relative",
                      plan.popular && "lg:-mt-4 lg:-mb-4"
                    )}
                  >
                    {/* Badge "Plus Populaire" positionné en dehors */}
                    {plan.popular && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative flex justify-center"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 blur-lg opacity-50 rounded-full" />
                          <div className="relative px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center gap-2 shadow-lg">
                            <Star className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium text-white whitespace-nowrap">
                              {t.pricing.popularBadge}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Conteneur de la carte avec Glow limité */}
                    <div className="overflow-hidden rounded-xl shadow-lg relative">
                      <Card 
                        className={cn(
                          "relative h-full transition-all duration-500",
                          plan.popular ? "bg-gradient-to-b from-purple-500/[0.15] to-transparent border-purple-500/50" : "border border-gray-200 dark:border-purple-500/10"
                        )}
                      >
                        {/* Effet de Glow interne */}
                        {plan.popular && (
                          <div className={`absolute inset-0 rounded-xl shadow-[0_0_20px_#facc15] pointer-events-none`} />
                        )}

                        {/* Contenu de la carte */}
                        <div className="p-8">
                          <div className="mb-8 space-y-4">
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <div className="flex items-baseline gap-x-2">
                              <span className="text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                {plan.price}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                {plan.duration}
                              </span>
                            </div>
                          </div>

                          {/* Liste des fonctionnalités avec animations */}
                          <ul className="space-y-5 mb-8">
                            {plan.features.map((feature: string, i: number) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start group"
                              >
                                <div className="rounded-full p-1 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                  <Check className="h-4 w-4 text-primary" />
                                </div>
                                <span className="ml-3 text-gray-700 dark:text-gray-300">
                                  {feature}
                                </span>
                              </motion.li>
                            ))}
                          </ul>

                          {/* Bouton avec effet de brillance */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              className={cn(
                                "w-full relative overflow-hidden transition-all duration-300",
                                plan.popular ? [
                                  "bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90",
                                  "after:absolute after:inset-0 after:bg-white/20 after:translate-x-[-100%] after:hover:translate-x-[100%] after:transition-transform after:duration-300"
                                ] : [
                                  "bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700",
                                  "border border-gray-200 dark:border-gray-700"
                                ]
                              )}
                            >
                              {plan.cta}
                            </Button>
                          </motion.div>
                        </div>

                        {/* Effet de brillance au hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                      </Card>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 