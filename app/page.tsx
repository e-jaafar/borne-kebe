'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Camera, Zap, CheckCircle, Star, Share2, Settings, Mail, ArrowUp } from "lucide-react"
import { useLang } from "@/context/LangContext"
// import Image from "next/image"
import { useEffect, useState } from 'react'
import { XMLParser } from 'fast-xml-parser'
import { GalleryImage } from '@/components/GalleryImage'
import Image from "next/image"
import { DemoVideo } from '@/components/DemoVideo'
import { FadeIn } from '@/components/ui/motion'
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"



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
      title: "Une question, besoin d'information ?",
      subtitle: "Notre équipe est là pour vous aider",
      cta: "Contactez-nous",
      floating_button: "Nous contacter"
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
      categories: [
        "Tous",
        "Mariages",
        "Entreprises",
        "Soirées",
        "Événements"
      ],
      filters: {
        all: "Tous",
        wedding: "Mariages",
        corporate: "Entreprises",
        party: "Soirées",
        event: "Événements"
      }
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
    },
    stats: {
      events: {
        value: "500+",
        label: "Événements réalisés"
      },
      photos: {
        value: "50K+",
        label: "Photos prises"
      },
      satisfaction: {
        value: "98%",
        label: "Clients satisfaits"
      },
      support: {
        value: "24/7",
        label: "Support client"
      }
    },
    scrollToTop: "Retour en haut",
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
      title: "Got a question or need information?",
      subtitle: "Our team is here to help",
      cta: "Contact us",
      floating_button: "Contact us"
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
      categories: [
        "All",
        "Weddings",
        "Corporate",
        "Parties",
        "Events"
      ],
      filters: {
        all: "All",
        wedding: "Weddings",
        corporate: "Corporate",
        party: "Parties",
        event: "Events"
      }
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
    },
    stats: {
      events: {
        value: "500+",
        label: "Events completed"
      },
      photos: {
        value: "50K+",
        label: "Photos taken"
      },
      satisfaction: {
        value: "98%",
        label: "Satisfied clients"
      },
      support: {
        value: "24/7",
        label: "Customer support"
      }
    },
    scrollToTop: "Back to top",
  },
  nl: {
    hero: {
      title: "Borne Kébè",
      subtitle: "Hoogwaardige photobooth-oplossingen voor uw professionele en privé-evenementen.",
      cta1: "Offerte aanvragen",
      cta2: "Ontdek onze diensten"
    },
    features: {
      title: "Borne Kébè Excellentie",
      cta: "Ontdek al onze functies",
      items: [
        { title: "Geavanceerde Gezichtsherkenning", description: "Geavanceerde technologie voor een optimale gebruikerservaring" },
        { title: "Professionele Kwaliteit", description: "Hoge resolutie beelden waardig aan de grootste evenementen" },
        { title: "Direct Delen", description: "Onmiddellijke verspreiding op uw favoriete platforms" }
      ]
    },
    why: {
      title: "Waarom Kiezen voor Borne Kébè?",
      description: "Borne Kébè biedt een ongeëvenaarde photobooth-ervaring, die geavanceerde technologie en elegantie combineert voor uw professionele en privé-evenementen.",
      items: [
        "Geavanceerde gezichtsherkenning technologie",
        "Direct delen op sociale netwerken",
        "Volledige aanpassing van de ervaring",
        "Toegewijde technische ondersteuning"
      ],
      cta: "Demonstratie aanvragen"
    },
    reviews: {
      title: "Wat Onze Klanten Zeggen",
      items: [
        { name: "Marie D.", comment: "Borne Kébè heeft onze bruiloft omgetoverd tot een onvergetelijke ervaring. Uitzonderlijke kwaliteit!" },
        { name: "Peter L.", comment: "Perfect voor onze bedrijfsevenementen. Professioneel en innovatief." },
        { name: "Sophie M.", comment: "Het direct delen was een groot succes bij onze gasten. Zeer aanbevolen!" }
      ]
    },
    contact: {
      title: "Een vraag of informatie nodig?",
      subtitle: "Ons team staat voor u klaar",
      cta: "Neem contact op",
      floating_button: "Contact"
    },
    howItWorks: {
      title: "Hoe werkt het?",
      subtitle: "Een eenvoudige en intuïtieve ervaring",
      steps: [
        {
          title: "Poseer",
          description: "Ga voor onze booth staan en laat u leiden door onze intuïtieve interface",
          icon: Camera
        },
        {
          title: "Gezichtsherkenning",
          description: "Onze technologie herkent automatisch gezichten om uw foto's gemakkelijk terug te vinden",
          icon: Users
        },
        {
          title: "Direct Bewerken",
          description: "Pas professionele filters toe en personaliseer uw foto's",
          icon: Settings
        },
        {
          title: "Direct Delen",
          description: "Ontvang uw foto's op uw telefoon of print ze direct",
          icon: Share2
        }
      ]
    },
    gallery: {
      title: "Onze Galerij",
      subtitle: "Ontdek de magische momenten vastgelegd door onze photobooths",
      filters: {
        all: "Alle",
        wedding: "Bruiloften",
        corporate: "Zakelijk",
        party: "Feesten",
        event: "Evenementen"
      }
    },
    faq: {
      title: "Veelgestelde Vragen",
      subtitle: "Alles wat u moet weten over onze diensten",
      items: [
        {
          question: "Hoe lang bewaart u de foto's?",
          answer: "We bewaren uw foto's veilig gedurende 30 dagen, met mogelijkheid tot verlenging."
        },
        {
          question: "Is gezichtsherkenning veilig?",
          answer: "Ja, we gebruiken geavanceerde technologieën en voldoen aan de AVG. Gegevens worden versleuteld en na het evenement verwijderd."
        },
        {
          question: "Kan de interface worden aangepast?",
          answer: "Absoluut! We passen de interface aan uw huisstijl en het thema van uw evenement aan."
        }
      ]
    },
    stats: {
      events: {
        value: "500+",
        label: "Evenementen voltooid"
      },
      photos: {
        value: "50K+",
        label: "Foto's genomen"
      },
      satisfaction: {
        value: "98%",
        label: "Tevreden klanten"
      },
      support: {
        value: "24/7",
        label: "Klantenservice"
      }
    },
    scrollToTop: "Naar boven"
  }
}

export default function Component() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]
  const [galleryImages, setGalleryImages] = useState<S3Image[]>([])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com/')
        const xmlData = await response.text()
        const parser = new XMLParser()
        const result = parser.parse(xmlData)
        
        const images = result.ListBucketResult.Contents
          .filter((item: S3Image) => 
            item.Key.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)
          )
          .sort(() => 0.5 - Math.random())
          .slice(0, 10)

        setGalleryImages(images)
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error)
      }
    }

    fetchImages()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      console.log('Scroll position:', scrolled);
      setShowScrollButton(scrolled > 100);
      console.log('showScrollButton:', scrolled > 100);
    };

    setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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
          <FadeIn>
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4 max-w-[800px] mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg [text-wrap:balance]">
                  {t.hero.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl drop-shadow-md leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full sm:w-auto bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white transition-all duration-300 shadow-lg"
                >
                  <Link href="/pricing">{t.hero.cta1}</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-2 border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  <Link href="/features">{t.hero.cta2}</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-100 to-white dark:from-[#140b24] dark:to-[#1a0f2e] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
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
            </FadeIn>
            <FadeIn direction="right">
              <DemoVideo />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-white dark:bg-[#1a0f2e] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeIn>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{t.stats.events.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.stats.events.label}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{t.stats.photos.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.stats.photos.label}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{t.stats.satisfaction.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.stats.satisfaction.label}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{t.stats.support.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.stats.support.label}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">{t.features.title}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    {index === 0 && <Users className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                    {index === 1 && <Camera className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                    {index === 2 && <Zap className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                    <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-50">{feature.title}</h3>
                    <p className="text-center text-gray-600 dark:text-gray-200">{feature.description} </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300 transition-all duration-300">
                <Link href="/features">{t.features.cta}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{t.howItWorks.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">{t.howItWorks.subtitle}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, index) => {
              const Icon = step.icon
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center space-y-4 relative">
                    <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">{t.reviews.title}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.reviews.items.map((review, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex flex-col items-center h-full p-6">
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-center text-gray-600 dark:text-gray-300 flex-1 flex items-center">
                      {review.comment}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 w-full text-center">
                      {review.name}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{t.gallery.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">{t.gallery.subtitle}</p>
            </div>
          </FadeIn>
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => {
              const layout = getImageLayout(index)
              
              return (
                <FadeIn key={image.ETag} delay={index * 0.1}>
                  <GalleryImage
                    imageKey={image.Key}
                    index={index}
                    layout={layout}
                    priority={index < 4}
                    onModalChange={(isOpen) => {
                      setIsModalOpen(isOpen)
                    }}
                  />
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">{t.faq.title}</h2>
          </FadeIn>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {t.faq.items.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="right">
                <div className="bg-white dark:bg-[#2d1f42] rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-8 md:py-12 bg-white dark:bg-[#1a0f2e] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{t.contact.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                {t.contact.subtitle}
              </p>
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white transition-colors"
              >
                <Link href="/contact">
                  {t.contact.cta}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full px-6"
        >
          <Link href="/contact">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {t.contact.floating_button}
            </span>
          </Link>
        </Button>
      </div>

      <div 
        className={`fixed bottom-8 left-8 z-50 transition-all duration-300 ${
          showScrollButton ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        } ${isModalOpen ? 'blur-sm' : ''}`}
      >
        <Button
          size="lg"
          onClick={scrollToTop}
          className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full px-6 backdrop-blur-sm"
        >
          <span className="flex items-center gap-2">
            <ArrowUp className="w-4 h-4" />
            {t.scrollToTop}
          </span>
        </Button>
      </div>
      
    </div>
  )
}

const getImageLayout = (index: number): 'square' | 'tall' | 'wide' | 'large' => {
  const pattern = index % 12
  if (pattern === 0) return 'large'
  if (pattern === 4 || pattern === 8) return 'tall'
  if (pattern === 2 || pattern === 6) return 'wide'
  return 'square'
}