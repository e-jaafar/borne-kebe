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
        description: "Photos haute résolution avec éclairage optimisé",
        details: "Nos bornes sont équipées d'appareils photo professionnels et d'un système d'éclairage LED ajustable pour garantir des photos de qualité studio, quelle que soit l'ambiance de votre événement."
      },
      {
        icon: Share2,
        title: "Partage Instantané",
        description: "Envoi immédiat par email et partage sur les réseaux sociaux",
        details: "Partagez vos photos instantanément sur vos réseaux sociaux préférés, recevez-les par email ou SMS. Notre système permet également la création d'albums en ligne privés pour votre événement."
      },
      {
        icon: Smartphone,
        title: "Application Mobile",
        description: "Contrôle à distance et galerie personnelle",
        details: "Accédez à toutes vos photos depuis notre application mobile dédiée. Contrôlez la borne à distance, personnalisez les paramètres et gérez votre galerie en temps réel."
      },
      {
        icon: Palette,
        title: "Personnalisation",
        description: "Filtres et cadres personnalisables selon votre événement",
        details: "Personnalisez l'interface avec vos couleurs, logo et thème. Créez des cadres sur mesure et choisissez parmi notre bibliothèque de filtres professionnels pour des photos uniques."
      },
      {
        icon: Cloud,
        title: "Stockage Cloud",
        description: "Accès sécurisé à toutes vos photos",
        details: "Vos photos sont automatiquement sauvegardées dans un espace cloud sécurisé. Accédez-y quand vous voulez et téléchargez-les en haute résolution pendant 30 jours."
      },
      {
        icon: Shield,
        title: "Sécurité",
        description: "Protection des données et confidentialité garantie",
        details: "Nous respectons le RGPD et utilisons un cryptage de bout en bout. Vos données sont protégées et automatiquement supprimées après la période de conservation convenue."
      },
      {
        icon: Printer,
        title: "Impression Illimitée",
        description: "Photos instantanées de haute qualité",
        details: "Imprimez autant de photos que vous le souhaitez avec notre système d'impression sublimation professionnel. Plusieurs formats disponibles et possibilité de réimpressions illimitées."
      },
      {
        icon: Users,
        title: "Multi-utilisateurs",
        description: "Parfait pour les grands événements",
        details: "Gérez plusieurs files d'attente simultanément, créez des groupes de photos et permettez à tous vos invités d'accéder facilement à leurs clichés grâce à notre système de reconnaissance faciale."
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
        description: "High resolution photos with optimized lighting",
        details: "Our devices are equipped with professional cameras and an adjustable LED lighting system to ensure high-quality studio photos, regardless of the ambiance of your event."
      },
      {
        icon: Share2,
        title: "Instant Sharing",
        description: "Immediate email sending and social media sharing",
        details: "Share your photos instantly on your preferred social media platforms, receive them via email or SMS. Our system also allows for the creation of private online albums for your event."
      },
      {
        icon: Smartphone,
        title: "Mobile App",
        description: "Remote control and personal gallery",
        details: "Access all your photos from our dedicated mobile app. Control the device remotely, customize settings, and manage your gallery in real-time."
      },
      {
        icon: Palette,
        title: "Customization",
        description: "Customizable filters and frames for your event",
        details: "Customize the interface with your colors, logo, and theme. Create custom frames and choose from our library of professional filters for unique photos."
      },
      {
        icon: Cloud,
        title: "Cloud Storage",
        description: "Secure access to all your photos",
        details: "Your photos are automatically backed up in a secure cloud space. Access them whenever you want and download them in high resolution for 30 days."
      },
      {
        icon: Shield,
        title: "Security",
        description: "Data protection and guaranteed confidentiality",
        details: "We comply with the GDPR and use end-to-end encryption. Your data is protected and automatically deleted after the agreed retention period."
      },
      {
        icon: Printer,
        title: "Unlimited Printing",
        description: "High quality instant photos",
        details: "Print as many photos as you want with our professional sublimation printing system. Multiple formats available and unlimited reprints."
      },
      {
        icon: Users,
        title: "Multi-users",
        description: "Perfect for large events",
        details: "Manage multiple queues simultaneously, create photo groups, and allow all your guests to easily access their photos using our facial recognition system."
      }
    ]
  }
}

export default function FeaturesPage() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 text-gray-900 dark:text-white">{t.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {t.features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl active:scale-95 touch-manipulation transition-all duration-500 dark:bg-[#2d1f42] relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-[#2d1f42] dark:to-[#1a0f2e] md:hover:scale-105"
              >
                <CardContent className="flex flex-col items-center space-y-3 md:space-y-4 p-4 md:p-6 relative z-10">
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

                  {/* Overlay avec détails - Adapté pour le touch */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/95 to-purple-900/95 dark:from-purple-900/95 dark:to-purple-950/95 p-4 md:p-6 translate-y-[101%] group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-center backdrop-blur-sm">
                    <div className="text-white overflow-y-auto max-h-full">
                      <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 text-purple-100">{feature.title}</h4>
                      <p className="text-xs md:text-sm leading-relaxed text-purple-50/90">
                        {feature.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
} 