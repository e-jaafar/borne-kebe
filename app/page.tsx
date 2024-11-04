'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, Camera, Zap, CheckCircle, Star, Mail, Phone, MapPin, Share2, Settings } from "lucide-react"
import { useLang } from "@/context/LangContext"
// import Image from "next/image"
import { useEffect, useState } from 'react'
import { XMLParser } from 'fast-xml-parser'
import { GalleryImage } from '@/components/GalleryImage'
import Image from "next/image"
import { DemoVideo } from '@/components/DemoVideo'



// Définir les types pour les images S3
type S3Image = {
  Key: string
  LastModified: string
  ETag: string
  Size: number
  StorageClass: string
}

const translations = {
  fr: {
    hero: {
      title: "Borne Kébè ",
      subtitle: "Solutions de photobooth haut de gamme pour vos événements professionnels et privés.",
      cta1: "Demander un devis",
      cta2: "Découvrir nos services"
    },
    features: {
      title: "L'excellence Borne Kébè",
      cta: "Explorer toutes nos fonctionnalités",
      items: [
        { title: "Reconnaissance faciale avancée", description: "Technologie de pointe pour une expérience utilisateur optimale" },
        { title: "Qualité professionnelle", description: "Images haute résolution dignes des plus grands événements" },
        { title: "Partage instantané", description: "Diffusion immédiate sur vos plateformes préférées" }
      ]
    },
    why: {
      title: "Pourquoi choisir Borne Kébè ?",
      description: "Borne Kébè offre une expérience photo booth inégalée, alliant technologie de pointe et élégance pour vos événements professionnels et privés.",
      items: [
        "Technologie de reconnaissance faciale avancée",
        "Partage instantané sur les réseaux sociaux",
        "Personnalisation complète de l'expérience",
        "Assistance technique dédiée"
      ],
      cta: "Demander une démonstration"
    },
    reviews: {
      title: "Ce que disent nos clients",
      items: [
        { name: "Marie D.", comment: "Borne Kébè a transformé notre mariage en une expérience inoubliable. Qualité exceptionnelle !" },
        { name: "Pierre L.", comment: "Parfait pour nos événements d'entreprise. Professionnel et innovant." },
        { name: "Sophie M.", comment: "Le partage instantané a été un grand succès auprès de nos invités. Très recommandé !" }
      ]
    },
    contact: {
      title: "Contactez-nous",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre email",
      messagePlaceholder: "Votre message",
      submitButton: "Envoyer",
      address: "rue saint michel 5, 1000 Bruxelles"
    },
    howItWorks: {
      title: "Comment ça marche ?",
      subtitle: "Une expérience simple et intuitive",
      steps: [
        {
          title: "Prenez la pose",
          description: "Placez-vous devant notre borne et laissez-vous guider par notre interface intuitive",
          icon: Camera
        },
        {
          title: "Reconnaissance faciale",
          description: "Notre technologie identifie automatiquement les visages pour retrouver facilement vos photos",
          icon: Users
        },
        {
          title: "Retouches instantanées",
          description: "Appliquez des filtres professionnels et personnalisez vos photos",
          icon: Settings
        },
        {
          title: "Partage immédiat",
          description: "Récupérez vos photos sur votre téléphone ou imprimez-les instantanément",
          icon: Share2
        }
      ]
    },
    gallery: {
      title: "Notre galerie",
      subtitle: "Découvrez les moments magiques capturés par nos photobooths",
      categories: ["Mariage", "Entreprise", "Soirée", "Événement"]
    },
    faq: {
      title: "Questions fréquentes",
      subtitle: "Tout ce que vous devez savoir sur nos services",
      items: [
        {
          question: "Combien de temps gardez-vous les photos ?",
          answer: "Nous conservons vos photos de manière sécurisée pendant 30 jours, avec possibilité d'extension."
        },
        {
          question: "La reconnaissance faciale est-elle sécurisée ?",
          answer: "Oui, nous utilisons des technologies de pointe et respectons le RGPD. Les données sont cryptées et supprimées après l'événement."
        },
        {
          question: "Peut-on personnaliser l'interface de la borne ?",
          answer: "Absolument ! Nous adaptons l'interface à votre charte graphique et au thème de votre événement."
        },
        // ... autres questions
      ]
    }
  },
  en: {
    hero: {
      title: "Borne Kébè",
      subtitle: "High-end photobooth solutions for your professional and private events.",
      cta1: "Request a quote",
      cta2: "Discover our services"
    },
    features: {
      title: "Borne Kébè Excellence",
      cta: "Explore all our features",
      items: [
        { title: "Advanced Facial Recognition", description: "Cutting-edge technology for an optimal user experience" },
        { title: "Professional Quality", description: "High-resolution images worthy of the grandest events" },
        { title: "Instant Sharing", description: "Immediate distribution on your favorite platforms" }
      ]
    },
    why: {
      title: "Why Choose Borne Kébè?",
      description: "Borne Kébè offers an unparalleled photo booth experience, combining cutting-edge technology and elegance for your professional and private events.",
      items: [
        "Advanced facial recognition technology",
        "Instant sharing on social networks",
        "Complete customization of the experience",
        "Dedicated technical assistance"
      ],
      cta: "Request a demonstration"
    },
    reviews: {
      title: "What Our Clients Say",
      items: [
        { name: "Mary D.", comment: "Borne Kébè transformed our wedding into an unforgettable experience. Exceptional quality!" },
        { name: "Peter L.", comment: "Perfect for our corporate events. Professional and innovative." },
        { name: "Sophie M.", comment: "The instant sharing was a big hit with our guests. Highly recommended!" }
      ]
    },
    contact: {
      title: "Contact Us",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
      submitButton: "Send",
      address: "123 Innovation Street, 75000 Paris, France"
    },
    howItWorks: {
      title: "How it works?",
      subtitle: "A simple and intuitive experience",
      steps: [
        {
          title: "Strike a pose",
          description: "Stand in front of our booth and let our intuitive interface guide you",
          icon: Camera
        },
        {
          title: "Facial Recognition",
          description: "Our technology automatically identifies faces to easily find your photos",
          icon: Users
        },
        {
          title: "Instant Retouching",
          description: "Apply professional filters and customize your photos",
          icon: Settings
        },
        {
          title: "Instant Sharing",
          description: "Get your photos on your phone or print them instantly",
          icon: Share2
        }
      ]
    },
    gallery: {
      title: "Our Gallery",
      subtitle: "Discover the magical moments captured by our photobooths",
      categories: ["Wedding", "Corporate", "Party", "Event"]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our services",
      items: [
        {
          question: "How long do you keep the photos?",
          answer: "We securely store your photos for 30 days, with possibility of extension."
        },
        {
          question: "Is facial recognition secure?",
          answer: "Yes, we use cutting-edge technologies and comply with GDPR. Data is encrypted and deleted after the event."
        },
        {
          question: "Can we customize the booth interface?",
          answer: "Absolutely! We adapt the interface to your branding and event theme."
        }
      ]
    }
  }
}

export default function Component() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]
  const [galleryImages, setGalleryImages] = useState<S3Image[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com/')
        const xmlData = await response.text()
        const parser = new XMLParser()
        const result = parser.parse(xmlData)
        
        // Filtrer les images (seulement les .jpg, .png, etc)
        const images = result.ListBucketResult.Contents
          .filter((item: S3Image) => 
            item.Key.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)
          )
          // Prendre 10 images au hasard
          .sort(() => 0.5 - Math.random())
          .slice(0, 10)

        setGalleryImages(images)
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error)
      }
    }

    fetchImages()
  }, [])



  return (
    <div className={`flex flex-col items-center`}>
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
        {/* Background Image avec overlay plus sombre */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/videos/photobooth.jpg"
            alt="Photobooth background"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          {/* Ajouter un overlay plus sombre */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        {/* Content avec texte plus contrasté */}
        <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                {t.hero.title}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl drop-shadow-md">
                {t.hero.subtitle}
              </p>
            </div>
            <div className="space-x-4 mt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <Link href="/pricing">{t.hero.cta1}</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <Link href="/features">{t.hero.cta2}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-white">{t.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 dark:bg-[#2d1f42]">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  {index === 0 && <Users className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                  {index === 1 && <Camera className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                  {index === 2 && <Zap className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                  <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-50">{feature.title}</h3>
                  <p className="text-center text-gray-600 dark:text-gray-200">{feature.description} </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300 transition-all duration-300">
              <Link href="/features">{t.features.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24]">
  <div className="container mx-auto max-w-7xl px-4 md:px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-gray-100">{t.why.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 md:text-lg">{t.why.description}</p>
        <ul className="space-y-2">
          {t.why.items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              <span className="text-gray-600 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-4 bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300 transition-all duration-300">
          <Link href="/contact">{t.why.cta}</Link>
        </Button>
      </div>
      <DemoVideo />
    </div>
  </div>
</section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{t.gallery.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.gallery.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-4">
            {galleryImages.map((image, index) => {
              let layout: 'square' | 'tall' | 'wide' | 'large' = 'square'
              
              switch (index % 12) {
                case 0:
                  layout = 'large'
                  break
                case 2:
                case 8:
                  layout = 'tall'
                  break
                case 3:
                case 7:
                  layout = 'wide'
                  break
                default:
                  layout = 'square'
              }

              return (
                <GalleryImage
                  key={image.ETag}
                  imageKey={image.Key}
                  index={index}
                  layout={layout}
                  priority={index < 4}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-gray-100">{t.reviews.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.reviews.items.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 dark:bg-[#2d1f42] dark:hover:bg-[#3d2a5a]">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-300">{review.comment}</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-gray-100">{t.contact.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form className="space-y-4">
              <Input placeholder={t.contact.namePlaceholder} />
              <Input type="email" placeholder={t.contact.emailPlaceholder} />
              <Textarea placeholder={t.contact.messagePlaceholder} />
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white transition-all duration-300"
              >
                {t.contact.submitButton}
              </Button>
            </form>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail  className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                <span className="text-gray-600 dark:text-gray-300">contact@Borne Kébè.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                <span className="text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                <span className="text-gray-600 dark:text-gray-300">{t.contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{t.howItWorks.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.howItWorks.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{t.faq.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.faq.subtitle}</p>
          </div>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {t.faq.items.map((item, index) => (
              <div key={index} className="bg-white dark:bg-[#2d1f42] rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}