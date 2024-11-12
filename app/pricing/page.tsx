'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const translations = {
  fr: {
    title: "Nos Forfaits",
    subtitle: "Choisissez l'offre qui correspond à vos besoins",
    popularBadge: "Plus populaire",
    plans: [
      {
        name: "Essentiel",
        price: "300€",
        duration: "par événement",
        features: [
          "Photobooth",
          "Accès illimité aux photos de l'événement",
          "Impression de 100 photos max",
          "1 borne photo avec personnel",
          "Reconnaissance faciale",
          "Livraison des photos par lien numérique",
        ],
        cta: "Choisir l'Essentiel",
        popular: false
      },
      {
        name: "Premium",
        price: "450€",
        duration: "par événement",
        features: [
          "Accès illimité aux photos de l'événement",
          "Impression de 300 photos max",
          "1 borne photo avec personnel",
          "Reconnaissance faciale",
          "Livraison des photos par lien numérique",
          "Réduction photographe de 5%"
        ],
        cta: "Choisir le Premium",
        popular: true
      },
      {
        name: "VIP",
        price: "650€",
        duration: "par événement",
        features: [
          "Accès illimité aux photos de l'événement",
          "Impression de 650 photos max",
          "1 borne photo avec personnel",
          "Reconnaissance faciale",
          "Livraison des photos par lien numérique",
          "Réduction photographe de 10%"
        ],
        cta: "Choisir le VIP",
        popular: false
      }
    ]
  },
  en: {
    title: "Our Plans",
    subtitle: "Choose the plan that fits your needs",
    popularBadge: "Most Popular",
    plans: [
      {
        name: "Essential",
        price: "300€",
        duration: "per event",
        features: [
          "Unlimited event photo access",
          "Up to 100 photo prints",
          "1 photo booth with staff",
          "Facial recognition",
          "Digital photo delivery",
        ],
        cta: "Choose Essential",
        popular: false
      },
      {
        name: "Premium",
        price: "450€",
        duration: "per event",
        features: [
          "Unlimited event photo access",
          "Up to 300 photo prints",
          "1 photo booth with staff",
          "Facial recognition",
          "Digital photo delivery",
          "5% photographer discount"
        ],
        cta: "Choose Premium",
        popular: true
      },
      {
        name: "VIP",
        price: "650€",
        duration: "per event",
        features: [
          "Unlimited event photo access",
          "Up to 650 photo prints",
          "1 photo booth with staff",
          "Facial recognition",
          "Digital photo delivery",
          "10% photographer discount"
        ],
        cta: "Choose VIP",
        popular: false
      }
    ]
  },
  nl: {
    title: "Onze Pakketten",
    subtitle: "Kies het pakket dat bij u past",
    popularBadge: "Meest Populair",
    plans: [
      {
        name: "Essentieel",
        price: "300€",
        duration: "per evenement",
        features: [
          "Photobooth",
          "Onbeperkte toegang tot evenementfoto's",
          "Maximaal 100 foto's afdrukken",
          "1 fotohokje met personeel",
          "Gezichtsherkenning",
          "Digitale fotolevering via link",
        ],
        cta: "Kies Essentieel",
        popular: false
      },
      {
        name: "Premium",
        price: "450€",
        duration: "per evenement",
        features: [
          "Onbeperkte toegang tot evenementfoto's",
          "Maximaal 300 foto's afdrukken",
          "1 fotohokje met personeel",
          "Gezichtsherkenning",
          "Digitale fotolevering via link",
          "5% korting op fotograaf"
        ],
        cta: "Kies Premium",
        popular: true
      },
      {
        name: "VIP",
        price: "650€",
        duration: "per evenement",
        features: [
          "Onbeperkte toegang tot evenementfoto's",
          "Maximaal 650 foto's afdrukken",
          "1 fotohokje met personeel",
          "Gezichtsherkenning",
          "Digitale fotolevering via link",
          "10% korting op fotograaf"
        ],
        cta: "Kies VIP",
        popular: false
      }
    ]
  }
} as const

type Translations = typeof translations
type Lang = keyof Translations

export default function PricingPage() {
  const { lang } = useLang()
  const t = translations[lang as Lang]
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px]">
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8">
              {t.plans.map((plan, index) => (
                <div 
                  key={index} 
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
                      "relative h-full transition-all duration-500",
                      "before:absolute before:-top-4 before:left-0 before:right-0 before:h-4",
                      plan.popular && "bg-gradient-to-b from-purple-500/[0.15] to-transparent border-purple-500/50"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 blur-lg opacity-50" />
                          <div className="relative px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center gap-2">
                            <Star className="w-4 h-4 text-white" fill="white" />
                            <span className="text-sm font-medium text-white whitespace-nowrap">
                              {t.popularBadge}
                            </span>
                          </div>
                        </motion.div>
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
                        {plan.features.map((feature, i) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
