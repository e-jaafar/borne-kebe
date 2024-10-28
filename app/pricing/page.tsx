'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const translations = {
  fr: {
    title: "Nos Forfaits",
    subtitle: "Choisissez l'offre qui correspond à vos besoins",
    plans: [
      {
        name: "Essentiel",
        price: "599€",
        duration: "par jour",
        features: [
          "Photobooth HD",
          "Impressions illimitées",
          "Accessoires standards",
          "Support technique",
        ],
        cta: "Choisir l'Essentiel"
      },
      {
        name: "Premium",
        price: "899€",
        duration: "par jour",
        features: [
          "Tout de l'Essentiel",
          "Personnalisation complète",
          "Album digital",
          "Fond vert",
          "Assistant dédié"
        ],
        cta: "Choisir le Premium",
        popular: true
      },
      {
        name: "Entreprise",
        price: "Sur mesure",
        duration: "",
        features: [
          "Solution personnalisée",
          "Multiple booths",
          "Support prioritaire",
          "Analyse des données",
          "API disponible"
        ],
        cta: "Contacter l'équipe"
      }
    ]
  },
  en: {
    // ... (même structure que fr)
  }
}

export default function PricingPage() {
  const [lang] = useState("fr")
  const t = translations[lang as keyof typeof translations]

  return (
    <div className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                  Plus populaire
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