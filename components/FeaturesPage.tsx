'use client'

import { Camera, Share2, Smartphone, Palette, Cloud, Shield, Printer, Users } from "lucide-react"
import { Sparkles } from "lucide-react"
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { translations } from '@/translations'

type FeaturesPageProps = {
  translations: typeof translations[keyof typeof translations]
}

const features = {
  fr: [
    {
      title: "Photobooth Personnalisable",
      description: "Une expérience photo unique et sur mesure",
      icon: Camera,
      details: "Personnalisez entièrement l'expérience avec des cadres sur mesure, des filtres exclusifs et des animations personnalisées. Possibilité d'ajouter votre logo et vos couleurs de marque."
    },
    {
      title: "Partage Instantané",
      description: "Partagez vos moments instantanément",
      icon: Share2,
      details: "Envoi immédiat par email ou SMS, partage direct sur les réseaux sociaux, QR code pour téléchargement rapide. Galerie en ligne privée pour retrouver toutes vos photos."
    },
    {
      title: "Interface Intuitive",
      description: "Simple et facile à utiliser",
      icon: Smartphone,
      details: "Interface tactile moderne et intuitive, guidage vocal personnalisé, assistance utilisateur en temps réel. Adapté à tous les âges et tous les niveaux technologiques."
    },
    {
      title: "Personnalisation Avancée",
      description: "Adaptez à votre image",
      icon: Palette,
      details: "Thèmes personnalisables, filtres sur mesure, animations exclusives. Intégration parfaite avec votre charte graphique et identité visuelle."
    },
    {
      title: "Stockage Sécurisé",
      description: "Vos souvenirs en sécurité",
      icon: Cloud,
      details: "Sauvegarde automatique dans le cloud, protection des données personnelles, accès sécurisé à votre galerie privée. Conservation garantie pendant 30 jours."
    },
    {
      title: "Protection des Données",
      description: "Confidentialité assurée",
      icon: Shield,
      details: "Cryptage des données, conformité RGPD, suppression automatique après 30 jours. Vos données personnelles sont entre de bonnes mains."
    },
    {
      title: "Impression Haute Qualité",
      description: "Des tirages exceptionnels",
      icon: Printer,
      details: "Impression professionnelle sur place, choix de formats et finitions, papier photo premium. Repartez avec vos souvenirs immédiatement."
    },
    {
      title: "Support Premium",
      description: "Assistance dédiée",
      icon: Users,
      details: "Équipe professionnelle sur place, support technique 24/7, installation et configuration incluses. Nous sommes là pour vous accompagner."
    }
  ],
  en: [
    {
      title: "Customizable Photobooth",
      description: "A unique and tailored photo experience",
      icon: Camera,
      details: "Fully customize the experience with custom frames, exclusive filters and personalized animations. Option to add your logo and brand colors."
    },
    {
      title: "Instant Sharing",
      description: "Share your moments instantly",
      icon: Share2,
      details: "Immediate sending by email or SMS, direct sharing on social networks, QR code for quick download. Private online gallery to find all your photos."
    },
    {
      title: "Intuitive Interface",
      description: "Simple and easy to use",
      icon: Smartphone,
      details: "Modern and intuitive touch interface, customized voice guidance, real-time user assistance. Suitable for all ages and tech levels."
    },
    {
      title: "Advanced Customization",
      description: "Adapt to your image",
      icon: Palette,
      details: "Customizable themes, custom filters, exclusive animations. Perfect integration with your graphic charter and visual identity."
    },
    {
      title: "Secure Storage",
      description: "Your memories safe",
      icon: Cloud,
      details: "Automatic cloud backup, personal data protection, secure access to your private gallery. Guaranteed storage for 30 days."
    },
    {
      title: "Data Protection",
      description: "Assured confidentiality",
      icon: Shield,
      details: "Data encryption, GDPR compliance, automatic deletion after 30 days. Your personal data is in good hands."
    },
    {
      title: "High Quality Printing",
      description: "Exceptional prints",
      icon: Printer,
      details: "Professional on-site printing, choice of formats and finishes, premium photo paper. Leave with your memories immediately."
    },
    {
      title: "Premium Support",
      description: "Dedicated assistance",
      icon: Users,
      details: "Professional team on site, 24/7 technical support, installation and configuration included. We are here to support you."
    }
  ],
  nl: [
    {
      title: "Aanpasbare Photobooth",
      description: "Een unieke en op maat gemaakte foto-ervaring",
      icon: Camera,
      details: "Pas de ervaring volledig aan met aangepaste frames, exclusieve filters en gepersonaliseerde animaties. Mogelijkheid om uw logo en merkkleuren toe te voegen."
    },
    {
      title: "Direct Delen",
      description: "Deel je momenten direct",
      icon: Share2,
      details: "Onmiddellijk verzenden via e-mail of SMS, direct delen op sociale netwerken, QR-code voor snelle download. Privé online galerij om al je foto's terug te vinden."
    },
    {
      title: "Intuïtieve Interface",
      description: "Eenvoudig en gebruiksvriendelijk",
      icon: Smartphone,
      details: "Moderne en intuïtieve touchinterface, aangepaste spraakbegeleiding, realtime gebruikersondersteuning. Geschikt voor alle leeftijden en technische niveaus."
    },
    {
      title: "Geavanceerde Aanpassing",
      description: "Aanpassen aan uw imago",
      icon: Palette,
      details: "Aanpasbare thema's, aangepaste filters, exclusieve animaties. Perfecte integratie met uw huisstijl en visuele identiteit."
    },
    {
      title: "Veilige Opslag",
      description: "Uw herinneringen veilig",
      icon: Cloud,
      details: "Automatische cloud backup, bescherming van persoonlijke gegevens, beveiligde toegang tot uw privégalerij. Gegarandeerde opslag gedurende 30 dagen."
    },
    {
      title: "Gegevensbescherming",
      description: "Verzekerde vertrouwelijkheid",
      icon: Shield,
      details: "Gegevensversleuteling, AVG-naleving, automatische verwijdering na 30 dagen. Uw persoonlijke gegevens zijn in goede handen."
    },
    {
      title: "Hoogwaardige Afdrukken",
      description: "Uitzonderlijke prints",
      icon: Printer,
      details: "Professioneel printen ter plaatse, keuze uit formaten en afwerkingen, premium fotopapier. Vertrek direct met uw herinneringen."
    },
    {
      title: "Premium Ondersteuning",
      description: "Toegewijde assistentie",
      icon: Users,
      details: "Professioneel team ter plaatse, 24/7 technische ondersteuning, installatie en configuratie inbegrepen. Wij zijn er om u te ondersteunen."
    }
  ]
}

export function FeaturesPage({ translations: t }: FeaturesPageProps) {
  const { lang } = useLang()
  const currentFeatures = features[lang as keyof typeof features] || features.fr

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[200px] hover:h-[320px] rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-500"
            >
              {/* Effet de bac de développement amélioré */}
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              
              {/* Nouveau : Effet de lumière dynamique */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 -skew-x-12 animate-light-sweep" />
              </div>

              {/* Effet de liquide de développement amélioré */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-red-500/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-[1.5s] ease-in-out">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]" />
              </div>

              {/* Contenu initial */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Icône améliorée */}
                <div className="relative mb-4 group-hover:scale-90 transition-transform duration-200">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-50 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center backdrop-blur-sm">
                    <feature.icon className="w-6 h-6 text-white group-hover:rotate-[360deg] transition-transform duration-700" />
                    <div className="absolute inset-0 rounded-full border border-primary/50 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-1 rounded-full border border-primary/30 group-hover:scale-125 transition-transform duration-700" />
                  </div>
                </div>

                {/* Point lumineux repositionné */}
                <div className="absolute right-4 top-4 w-3 h-3 rounded-full bg-white/60 blur-[1px] group-hover:scale-150 transition-transform duration-700" />

                {/* Titre et description avec transition plus rapide */}
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:opacity-0 transition-all duration-75 group-hover:-translate-y-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:opacity-0 transition-all duration-75 group-hover:-translate-y-2 line-clamp-2">
                  {feature.description}
                </p>
              </div>

              {/* Contenu révélé amélioré */}
              <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                <div className="relative">
                  <h3 className="text-lg font-semibold mb-4 text-red-400 dark:text-red-300 opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100 group-hover:translate-y-0 translate-y-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/90 leading-relaxed text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 delay-150 group-hover:translate-y-0 translate-y-4">
                    {feature.details}
                  </p>

                  {/* Marques de développement améliorées */}
                  <div className="absolute -right-2 top-0 flex flex-col gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-3 bg-red-500/30 rounded-full group-hover:translate-x-0 translate-x-4 transition-transform"
                        style={{ 
                          opacity: 0.3 - i * 0.1,
                          transitionDelay: `${i * 100}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Effet de grain photo amélioré */}
              <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none group-hover:opacity-[0.25] transition-opacity duration-700" />

              {/* Bordure de négatif améliorée */}
              <div className="absolute -right-3 top-0 bottom-0 w-6 flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:translate-x-0 translate-x-4">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-red-500/40 transition-all duration-500"
                    style={{
                      width: i % 2 === 0 ? '16px' : '12px',
                      opacity: 0.4 - (i * 0.02),
                      transitionDelay: `${i * 50}ms`
                    }}
                  />
                ))}
              </div>

              {/* Flash photo amélioré */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-transparent opacity-0 group-hover:animate-photo-flash pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 