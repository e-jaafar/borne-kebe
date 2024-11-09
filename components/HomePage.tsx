'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Camera, Zap, CheckCircle, Mail, ArrowUp } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from 'react'
import { DemoVideo } from '@/components/DemoVideo'
import { FadeIn } from '@/components/ui/motion'
import { type HomePageTranslations } from '@/types/translations'
import { motion, useScroll, useTransform } from 'framer-motion'
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadStarsPreset } from "@tsparticles/preset-stars"
import { MasonryGrid } from '@/components/MasonryGrid'
import { TypeAnimation } from 'react-type-animation'
import { HowItWorks } from '@/components/HowItWorks'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
// type S3Image = {
//   Key: string
//   LastModified: string
//   ETag: string
//   Size: number
//   StorageClass: string
// }

type HomePageProps = {
  lang: string
  translations: HomePageTranslations
}

// Type pour les images
type LocalImage = {
  src: string
  alt: string
}

export function HomePage({ lang, translations: t }: HomePageProps) {
  const [galleryImages, setGalleryImages] = useState<LocalImage[]>([])
  const [init, setInit] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadStarsPreset(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  // Chargement des images
  useEffect(() => {
    // Fonction pour charger les images
    const loadImages = async () => {
      try {
        const response = await fetch('/api/getImages')
        const images = await response.json()
        setGalleryImages(images)
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error)
      }
    }

    loadImages()
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
    <main role="main" className="flex flex-col items-center relative">
      {/* Particules interactives avec paramètres optimisés */}
      {init && (
        <Particles
          id="tsparticles"
          className="fixed inset-0 z-20 pointer-events-none"
          options={{
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  width: 1920,
                  height: 1080
                }
              },
              color: {
                value: ["#ffffff", "#9333ea", "#a855f7", "#c084fc"]
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "bounce"
                }
              },
              size: {
                value: { min: 2, max: 4 }
              },
              opacity: {
                value: { min: 0.3, max: 0.7 }
              },
              interactivity: {
                detectsOn: "window",
                events: {
                  onHover: {
                    enable: true,
                    mode: "slow",
                    parallax: {
                      enable: true,
                      force: 20,
                      smooth: 200
                    }
                  }
                },
                modes: {
                  slow: {
                    factor: 3,
                    radius: 200
                  },
                  grab: {
                    distance: 400,
                    links: {
                      opacity: 0.3,
                      width: 2
                    }
                  }
                }
              },
              links: {
                enable: true,
                distance: 200,
                color: "#9333ea",
                opacity: 0.2,
                width: 1.5
              }
            },
            fullScreen: {
              enable: false
            },
            detectRetina: true,
            background: {
              color: "transparent"
            }
          }}
        />
      )}

      {/* Hero Section améliorée */}
      <section 
        ref={heroRef} 
        onMouseMove={handleMouseMove}
        aria-label="Hero section"
        className="relative w-full min-h-[90vh] flex items-center py-12 md:py-24 lg:py-32 xl:py-40 overflow-hidden bg-[#1a0f2e]"
      >
        {/* Background avec Parallaxe amélioré */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: imageScale }}
        >
          <Image
            src="/videos/hero1.jpg"
            alt="Photobooth professionnel en action"
            fill
            priority
            quality={90}
            className="object-cover transition-transform duration-300 ease-out"
            style={{
              transform: `scale(1.1) translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f2e]/90 via-[#1a0f2e]/70 to-[#1a0f2e]/90 backdrop-blur-[2px]" />
        </motion.div>

        {/* Contenu optimisé pour mobile */}
        <motion.div 
          className="relative z-30 container mx-auto max-w-7xl px-4 md:px-6"
          style={{ opacity: contentOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center space-y-8 md:space-y-6 text-center"
          >
            <header className="space-y-6 md:space-y-4 max-w-[800px] mx-auto">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <TypeAnimation
                  sequence={[
                    t.hero.title,
                    1000,
                    ...t.hero.sequences,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                />
              </motion.h1>

              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-100 max-w-[90%] mx-auto leading-relaxed px-4 md:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                {t.hero.subtitle}
              </motion.p>
            </header>

            {/* Boutons CTA optimisés pour mobile */}
            <motion.div 
              className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 px-6 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto py-6 sm:py-4 text-base sm:text-lg relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg"
              >
                <Link href={`/${lang}/pricing`}>
                  <span className="relative z-10">{t.hero.cta1}</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>

              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto py-6 sm:py-4 text-base sm:text-lg border-2 border-white text-white bg-transparent hover:bg-white/10"
              >
                <Link href={`/${lang}/features`}>
                  {t.hero.cta2}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Indicateur de scroll amélioré */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-8 h-14 border-2 border-white/50 rounded-full flex justify-center p-2 backdrop-blur-sm">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <motion.p 
            className="text-white/70 text-sm mt-2 text-center font-light tracking-wider"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            SCROLL
          </motion.p>
        </motion.div>
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
         {/* How it works Section */}
         <HowItWorks 
  title={t.howItWorks.title}
  subtitle={t.howItWorks.subtitle}
  steps={t.howItWorks.steps}
/>

      {/* Features Section avec effets 3D et micro-interactions */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-[#140b24] dark:via-[#1a0f2e] dark:to-[#140b24]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              {t.features.title}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.items.slice(0, 3).map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5,
                    translateZ: 20
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full perspective-1000"
                >
                  <Card className="relative h-full overflow-hidden bg-gradient-to-br from-white to-gray-50/50 dark:from-[#2d1f42]/80 dark:to-[#1a0f2e]/80 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-purple-900/20 backdrop-blur-sm group">
                    {/* Effet de brillance au hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Cercle décoratif avec animation */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-16 -mt-16 transform group-hover:scale-150 group-hover:rotate-45 transition-transform duration-500" />

                    <CardContent className="flex flex-col items-center space-y-4 p-6 relative z-10">
                      {/* Icône avec animation */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-900 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                          {index === 0 && <Users className="h-8 w-8 text-white" />}
                          {index === 1 && <Camera className="h-8 w-8 text-white" />}
                          {index === 2 && <Zap className="h-8 w-8 text-white" />}
                          
                          {/* Effet de pulse */}
                          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transform scale-90 group-hover:scale-150 transition-all duration-700" />
                        </div>
                      </motion.div>

                      <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-50 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-base text-center text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <Link href={`/${lang}/features`}>
                    <span className="relative z-10">{t.features.cta}</span>
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section témoignages améliorée */}
      <TestimonialsCarousel 
        reviews={t.reviews.items}
        title={t.reviews.title}
      />

      {/* Gallery Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1a0f2e]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
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