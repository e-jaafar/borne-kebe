'use client'

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
import { useLang } from "@/context/LangContext"

const translations = {
  fr: {
    title: "Nos Services",
    subtitle: "Une solution complète pour vos événements",
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
    title: "Our Services",
    subtitle: "A complete solution for your events",
    features: [
      {
        icon: Camera,
        title: "Professional Quality",
        description: "High resolution photos with optimized lighting"
      },
      {
        icon: Share2,
        title: "Instant Sharing",
        description: "Immediate email sending and social media sharing"
      },
      {
        icon: Smartphone,
        title: "Mobile App",
        description: "Remote control and personal gallery"
      },
      {
        icon: Palette,
        title: "Customization",
        description: "Customizable filters and frames for your event"
      },
      {
        icon: Cloud,
        title: "Cloud Storage",
        description: "Secure access to all your photos"
      },
      {
        icon: Shield,
        title: "Security",
        description: "Data protection and guaranteed confidentiality"
      },
      {
        icon: Printer,
        title: "Unlimited Printing",
        description: "High quality instant photos"
      },
      {
        icon: Users,
        title: "Multi-users",
        description: "Perfect for large events"
      }
    ]
  }
}

export default function FeaturesPage() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]

  return (
    <div className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">{t.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-200">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 dark:bg-[#2d1f42]">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-50">
                    {feature.title}
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-100">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
} 