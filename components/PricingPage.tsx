'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeIn } from '@/components/ui/motion'

type PricingPageProps = {
  translations: any
}

export function PricingPage({ translations: t }: PricingPageProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t.pricing.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.pricing.subtitle}</p>
          </div>
        </FadeIn>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px]">
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8">
              {t.pricing.plans.map((plan: any, index: number) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div 
                    className={cn(
                      "flex flex-col",
                      plan.popular && [
                        "sm:transform-none lg:transform",
                        "sm:mt-0 lg:-mt-4",
                        "sm:mb-0 lg:-mb-4"
                      ]
                    )}
                  >
                    <Card 
                      className={cn(
                        "flex-1 relative transition-all duration-300 h-full",
                        plan.popular && [
                          "border-primary",
                          "shadow-lg",
                          "scale-100",
                          "sm:scale-100 lg:scale-105",
                          "hover:scale-105",
                          "sm:hover:scale-105 lg:hover:scale-110",
                          "z-10"
                        ]
                      )}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm whitespace-nowrap">
                          {t.pricing.popularBadge}
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl sm:text-xl lg:text-2xl">{plan.name}</CardTitle>
                        <div className="mt-4 flex items-baseline justify-center gap-x-2">
                          <span className="text-4xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {plan.duration}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4 mb-8">
                          {plan.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 shrink-0 text-primary mt-0.5 mr-3" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-xs lg:text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={cn(
                            "w-full text-sm sm:text-xs lg:text-sm",
                            plan.popular 
                              ? "bg-primary hover:bg-primary/90" 
                              : "bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700"
                          )}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 