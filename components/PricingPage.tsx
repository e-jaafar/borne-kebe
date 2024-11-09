'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeIn } from '@/components/ui/motion'
import { type PricingTranslations, type Plan } from '@/types/translations'

// Correction du typage des props
interface PricingPageProps {
  translations: PricingTranslations
}

export function PricingPage({ translations: t }: PricingPageProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center py-20">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-t from-secondary/20 to-transparent rounded-full blur-2xl opacity-20" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.pricing.subtitle}</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.pricing.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
          {t.pricing.plans.map((plan: Plan, index: number) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className={cn(
                "relative group h-full transition-all duration-500 hover:translate-y-[-8px]",
                plan.popular ? [
                  "bg-gradient-to-b from-primary/[0.15] to-transparent border-primary/50",
                  "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-primary/[0.05] before:rounded-[inherit]",
                  "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_0_30px_2px] after:shadow-primary/20 after:opacity-0 after:transition-opacity after:duration-500",
                  "hover:after:opacity-100"
                ] : "hover:border-primary/50"
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="relative px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full">
                      <span className="relative z-10 text-sm font-medium text-white">
                        {t.pricing.popularBadge}
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pt-10">
                  <CardTitle className="text-2xl font-bold mb-4">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {plan.duration}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="mt-6">
                  <ul className="space-y-5 mb-8">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start group/item">
                        <div className="rounded-full p-1 bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="ml-3 text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={cn(
                      "w-full relative overflow-hidden transition-all duration-300",
                      plan.popular ? [
                        "bg-gradient-to-r from-primary to-secondary hover:opacity-90",
                        "after:absolute after:inset-0 after:bg-white/20 after:translate-x-[-100%] after:hover:translate-x-[100%] after:transition-transform after:duration-300"
                      ] : [
                        "bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700",
                        "border border-gray-200 dark:border-gray-700"
                      ]
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
} 