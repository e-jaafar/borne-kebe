'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Camera, Share2, Smartphone, Palette, Cloud, Shield, Printer, Users } from "lucide-react"
import { FadeIn } from '@/components/ui/motion'
import { translations } from '@/translations'

type FeaturesPageProps = {
  translations: typeof translations[keyof typeof translations]
}

export function FeaturesPage({ translations: t }: FeaturesPageProps) {
  const features = [
    { icon: Camera, ...t.features.items[0] },
    { icon: Share2, ...t.features.items[1] },
    { icon: Smartphone, ...t.features.items[2] },
    { icon: Palette, ...t.features.items[3] },
    { icon: Cloud, ...t.features.items[4] },
    { icon: Shield, ...t.features.items[5] },
    { icon: Printer, ...t.features.items[6] },
    { icon: Users, ...t.features.items[7] }
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 text-gray-900 dark:text-white">
              {t.features.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200">
              {t.features.subtitle}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="group hover:shadow-2xl active:scale-95 touch-manipulation transition-all duration-500 dark:bg-[#2d1f42] relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-[#2d1f42] dark:to-[#1a0f2e] md:hover:scale-105 h-full">
                  <CardContent className="flex flex-col items-center space-y-3 md:space-y-4 p-4 md:p-6 relative z-10 h-full">
                    {/* Effet de brillance au hover/touch */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] group-active:translate-x-[100%] transition-transform duration-1000" />
                    
                    {/* Cercle décoratif */}
                    <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-8 -mt-8 md:-mr-12 md:-mt-12" />
                    
                    {/* Icône avec animation */}
                    <div className="relative">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-900 flex items-center justify-center transform group-hover:rotate-6 group-active:rotate-6 transition-all duration-300 shadow-lg">
                        <Icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      {/* Effet de halo */}
                      <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 group-active:scale-150 transition-transform duration-500" />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-center text-gray-900 dark:text-gray-50 relative">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-center text-gray-600 dark:text-gray-300 relative">
                      {feature.description}
                    </p>

                    {/* Overlay avec effet tiroir */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/95 to-purple-900/95 dark:from-purple-900/95 dark:to-purple-950/95 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-center backdrop-blur-sm pointer-events-none group-hover:pointer-events-auto">
                      <div className="text-white overflow-y-auto max-h-full scrollbar-hide">
                        <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 text-purple-100">
                          {feature.title}
                        </h4>
                        <p className="text-xs md:text-sm leading-relaxed text-purple-50/90">
                          {feature.details}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </div>
  )
} 