'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Camera, 
  Share2, 
  Smartphone, 
  Palette, 
  Cloud, 
  Shield, 
  Printer, 
  Users 
} from "lucide-react"

const translations = {
  fr: {
    title: "Nos Services",
    subtitle: "Découvrez toutes les fonctionnalités de notre photobooth",
    features: [
      {
        icon: Camera,
        title: "Qualité Professionnelle",
        description: "Photos haute résolution avec éclairage optimisé"
      },
      {
        icon: Share2,
        title: "Partage Instantané",
        description: "Envoi immédiat par email et partage sur les réseaux sociaux"
      },
      {
        icon: Smartphone,
        title: "Application Mobile",
        description: "Contrôle à distance et galerie personnelle"
      },
      {
        icon: Palette,
        title: "Personnalisation",
        description: "Filtres et cadres personnalisables selon votre événement"
      },
      {
        icon: Cloud,
        title: "Stockage Cloud",
        description: "Accès sécurisé à toutes vos photos"
      },
      {
        icon: Shield,
        title: "Sécurité",
        description: "Protection des données et confidentialité garantie"
      },
      {
        icon: Printer,
        title: "Impression Illimitée",
        description: "Photos instantanées de haute qualité"
      },
      {
        icon: Users,
        title: "Multi-utilisateurs",
        description: "Parfait pour les grands événements"
      }
    ]
  },
  en: {
    // ... (même structure que fr)
  }
}

export default function FeaturesPage() {
  const [lang] = useState("fr")
  const t = translations[lang as keyof typeof translations]

  return (
    <div className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Icon className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
} 