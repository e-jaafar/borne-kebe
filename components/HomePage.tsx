'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Camera, Zap, CheckCircle, Star, Share2, Settings, Mail, ArrowUp } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from 'react'
import { XMLParser } from 'fast-xml-parser'
import { DemoVideo } from '@/components/DemoVideo'
import { FadeIn } from '@/components/ui/motion'
import { type HomePageTranslations } from '@/types/translations'
import { motion, useScroll, useTransform } from 'framer-motion'
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { MasonryGrid } from '@/components/MasonryGrid'

type S3Image = {
  Key: string
  LastModified: string
  ETag: string
  Size: number
  StorageClass: string
}

type HomePageProps = {
  lang: string
  translations: HomePageTranslations
}

export function HomePage({ lang, translations: t }: HomePageProps) {
  const [galleryImages, setGalleryImages] = useState<S3Image[]>([])
  const [init, setInit] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Initialisation des particules
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  // Chargement des images
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

  // Gestion du bouton scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gestion du scroll pour le bouton CTA
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      // Détecte quand on est proche du bas (par exemple, à 100px du bas)
      const nearBottom = documentHeight - (scrollTop + windowHeight) < 100
      setIsNearBottom(nearBottom)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main role="main" className="flex flex-col items-center relative pb-16">
      {/* Hero Section avec Parallax */}
      <section 
        ref={heroRef} 
        aria-label="Hero section"
        className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden"
      >
        <motion.div 
          style={{ y, opacity }} 
          className="absolute inset-0 z-0"
        >
          <Image
            src="/videos/photobooth.jpg"
            alt="Photobooth professionnel en action lors d'un événement"
            fill
            priority
            loading="eager"
            quality={90}
            className="object-cover scale-110"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </motion.div>

        {/* Particules */}
        {init && (
          <div aria-hidden="true">
            <Particles
              id="tsparticles"
              className="absolute inset-0 z-10"
              options={{
                particles: {
                  color: {
                    value: "#ffffff"
                  },
                  number: {
                    value: 30
                  },
                  opacity: {
                    value: { min: 0.1, max: 0.3 },
                    animation: {
                      enable: true,
                      speed: 1,
                      sync: false,
                      startValue: "min",
                      destroy: "max"
                    }
                  },
                  size: {
                    value: { min: 1, max: 3 },
                    animation: {
                      enable: true,
                      speed: 2,
                      sync: false,
                      startValue: "min",
                      destroy: "max"
                    }
                  },
                  move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                      default: "out"
                    }
                  }
                },
                interactivity: {
                  events: {
                    onHover: {
                      enable: true,
                      mode: "bubble"
                    }
                  },
                  modes: {
                    bubble: {
                      distance: 200,
                      size: 6,
                      duration: 0.3,
                      opacity: 0.8
                    }
                  }
                },
                background: {
                  color: "transparent"
                },
                detectRetina: true
              }}
            />
          </div>
        )}

        {/* Contenu du Hero */}
        <div className="relative z-20 container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col items-center space-y-6 text-center">
              <header className="space-y-4 max-w-[800px] mx-auto">
                <motion.h1 
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {t.hero.title.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: i * 0.1
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p 
                  className="mx-auto max-w-[700px] text-gray-100 md:text-xl drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                  {t.hero.subtitle}
                </motion.p>
              </header>

              <nav aria-label="Actions principales">
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full sm:w-auto bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    <Link href={`/${lang}/pricing`} aria-label={`${t.hero.cta1} - Voir nos tarifs`}>
                      {t.hero.cta1}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-2 border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
                  >
                    <Link href={`/${lang}/features`} aria-label={`${t.hero.cta2} - Découvrir nos fonctionnalités`}>
                      {t.hero.cta2}
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-gray-100">
                  {t.why.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 md:text-lg">
                  {t.why.description}
                </p>
                <ul className="space-y-2">
                  {t.why.items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild 
                  size="lg" 
                  className="mt-4 bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300 transition-all duration-300"
                >
                  <Link href={`/${lang}/contact`}>{t.why.cta}</Link>
                </Button>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <DemoVideo />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {t.stats.items.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="relative group h-full">
                  {/* Effet de halo */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  
                  {/* Card avec hauteur fixe */}
                  <div className="relative bg-white dark:bg-[#2d1f42] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between min-h-[200px]">
                    {/* Contenu principal */}
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        {stat.value}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.description}
                      </p>
                    </div>
                    
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-100 to-white dark:from-[#140b24] dark:to-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              {t.features.title}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.items.slice(0, 3).map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    {index === 0 && <Users className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                    {index === 1 && <Camera className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                    {index === 2 && <Zap className="h-12 w-12 text-gray-900 dark:text-gray-200" />}
                    <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-base text-center text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Button 
                asChild 
                size="lg" 
                className="bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300 transition-all duration-300"
              >
                <Link href={`/${lang}/features`}>{t.features.cta}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              {t.reviews.title}
            </h2>
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

      {/* Gallery Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                {t.gallery.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t.gallery.subtitle}
              </p>
            </div>
          </FadeIn>

          <MasonryGrid 
            images={galleryImages}
          />
        </div>
      </section>

      {/* How it works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                {t.howItWorks.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t.howItWorks.subtitle}
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, index) => {
              const Icon = {
                Camera: Camera,
                Users: Users,
                Settings: Settings,
                Share2: Share2
              }[step.icon] || Camera;

              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center space-y-4 relative">
                    <div className="absolute left-0 -top-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      {Icon && <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
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

      {/* Contact Section */}
      <section className="w-full py-8 md:py-12 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                {t.contact.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                {t.contact.subtitle}
              </p>
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white transition-colors"
              >
                <Link href={`/${lang}/contact`}>
                  {t.contact.cta}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Floating Contact Button avec animation de translation */}
      <div 
        className={`fixed bottom-8 right-8 z-50 hidden md:block transition-transform duration-300 ${
          isNearBottom ? 'translate-y-[-100px]' : 'translate-y-0'
        }`}
      >
        <Button 
          asChild 
          size="lg"
          className="group bg-primary/80 hover:bg-primary text-white shadow-lg rounded-full px-8 py-6
            transform transition-all duration-1000 ease-out
            hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
            border border-purple-400/10 hover:border-purple-400/30
            relative overflow-hidden backdrop-blur-sm"
        >
          <Link href={`/${lang}/contact`}>
            {/* Effet de particules */}
            <div className="absolute inset-0">
              <div className="absolute h-2 w-2 bg-white/20 rounded-full top-1/4 left-1/4 animate-float-slow" />
              <div className="absolute h-2 w-2 bg-white/20 rounded-full bottom-1/4 right-1/3 animate-float-slower" />
              <div className="absolute h-1.5 w-1.5 bg-white/20 rounded-full top-1/3 right-1/4 animate-float" />
            </div>

            <span className="flex items-center gap-3 text-lg font-medium relative z-10">
              <div className="relative">
                <Mail className="w-5 h-5 transition-all duration-1000 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 animate-pulse opacity-0 group-hover:opacity-50 bg-white rounded-full duration-1000" />
              </div>
              
              <span className="relative">
                {t.contact.floating_button}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/80
                  origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </span>
            </span>
          </Link>
        </Button>
      </div>

      {/* Scroll to Top Button - Repositionné */}
      <div 
        className={`fixed md:bottom-8 md:left-8 bottom-20 left-4 z-50 transition-all duration-500 ease-in-out ${
          showScrollTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="icon"
          aria-label="Retour en haut de la page"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full w-10 h-10 p-0
            transform transition-all duration-300 hover:scale-110
            hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
            relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse" aria-hidden="true" />
          <ArrowUp className="w-5 h-5 relative z-10" aria-hidden="true" />
        </Button>
      </div>
    </main>
  )
} 