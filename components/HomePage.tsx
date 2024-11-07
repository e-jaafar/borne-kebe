'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Camera, Zap, CheckCircle, Star, Share2, Settings, Mail, ArrowUp } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { XMLParser } from 'fast-xml-parser'
import { GalleryImage } from '@/components/GalleryImage'
import { DemoVideo } from '@/components/DemoVideo'
import { FadeIn } from '@/components/ui/motion'
import { type HomePageTranslations } from '@/types/translations'

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

const getImageLayout = (index: number): 'square' | 'tall' | 'wide' | 'large' => {
  const pattern = index % 12
  if (pattern === 0) return 'large'
  if (pattern === 4 || pattern === 8) return 'tall'
  if (pattern === 2 || pattern === 6) return 'wide'
  return 'square'
}

export function HomePage({ lang, translations: t }: HomePageProps) {
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
      setShowScrollButton(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
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
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4 max-w-[800px] mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                  {t.hero.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl drop-shadow-md">
                  {t.hero.subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full sm:w-auto bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white transition-all duration-300 shadow-lg"
                >
                  <Link href={`/${lang}/pricing`}>{t.hero.cta1}</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-2 border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  <Link href={`/${lang}/features`}>{t.hero.cta2}</Link>
                </Button>
              </div>
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24]">
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

      {/* Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <Button 
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full px-6"
        >
          <Link href={`/${lang}/contact`}>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {t.contact.floating_button}
            </span>
          </Link>
        </Button>
      </div>

      {/* Scroll to Top Button */}
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