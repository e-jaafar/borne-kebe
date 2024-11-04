'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { cn } from "@/lib/utils"

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
  }
} as const

// Définir le type des traductions
type Translations = typeof translations
type Lang = keyof Translations

export default function PricingPage() {
  const { lang } = useLang()
  const t = translations[lang as Lang]
  
  return (
    <div className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.plans.map((plan, index) => (
            <Card 
              key={index} 
              className={cn(
                "relative transition-all duration-300",
                plan.popular ? [
                  "border-primary",
                  "shadow-lg",
                  "scale-105",
                  "hover:scale-110",
                  "z-10"
                ].join(" ") : "hover:scale-105"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                  {t.popularBadge}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.duration && (
                    <span className="text-gray-600 ml-2">{plan.duration}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 