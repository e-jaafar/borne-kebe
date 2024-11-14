'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Camera, Share2, Smartphone, Palette, Cloud, Shield, Printer, Users } from "lucide-react"
import { FadeIn } from '@/components/ui/motion'
import { translations } from '@/translations'
import { Sparkles } from "lucide-react"

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="relative h-full bg-card text-card-foreground">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FeatureIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-foreground text-xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
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