'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {  useRef, useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Image from "next/image"

type HeroSectionProps = {
  lang: string
  translations: {
    title: string
    subtitle: string
    sequences: readonly string[]
    cta1: string
    cta2: string
  }
  shouldReduceMotion: boolean
}

export function HeroSection({ lang, translations: t }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Mouse parallax effect seulement pour les images
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) { // Désactiver sur mobile
      const { clientX, clientY } = e
      const { width, height } = e.currentTarget.getBoundingClientRect()
      const x = (clientX / width - 0.5) * 1.5
      const y = (clientY / height - 0.5) * 1.5
      setMousePosition({ x, y })
    }
  }

  // Images avec positions optimisées pour une meilleure composition
  const images = [
    { 
      src: '/images/AJ100256.JPG', 
      position: { 
        desktop: { x: -25, y: -20 },
        mobile: { x: -10, y: -15 }
      },
      scale: { desktop: 1.2, mobile: 0.8 },
      rotation: -8
    },
    { 
      src: '/images/AJ100161.JPG', 
      position: { 
        desktop: { x: 25, y: -15 },
        mobile: { x: 10, y: -10 }
      },
      scale: { desktop: 1, mobile: 0.7 },
      rotation: 5
    },
    { 
      src: '/images/AJ102412.JPG', 
      position: { 
        desktop: { x: -20, y: 15 },
        mobile: { x: -8, y: 10 }
      },
      scale: { desktop: 1.1, mobile: 0.75 },
      rotation: -5
    },
    { 
      src: '/images/DSC00078.JPG', 
      position: { 
        desktop: { x: 20, y: 20 },
        mobile: { x: 8, y: 15 }
      },
      scale: { desktop: 0.9, mobile: 0.65 },
      rotation: 8
    },
    { 
      src: '/images/photo20240915012027187.jpg', 
      position: { 
        desktop: { x: 0, y: -25 },
        mobile: { x: 0, y: -20 }
      },
      scale: { desktop: 1.15, mobile: 0.7 },
      rotation: -3
    },
    { 
      src: '/images/photo20240915012127210.jpg', 
      position: { 
        desktop: { x: -35, y: 0 },
        mobile: { x: -12, y: 0 }
      },
      scale: { desktop: 0.95, mobile: 0.6 },
      rotation: 6
    },
    { 
      src: '/images/AJ102421.JPG', 
      position: { 
        desktop: { x: 35, y: 5 },
        mobile: { x: 12, y: 5 }
      },
      scale: { desktop: 1.05, mobile: 0.65 },
      rotation: -7
    },
    { 
      src: '/images/DSC00104.JPG', 
      position: { 
        desktop: { x: 0, y: 25 },
        mobile: { x: 0, y: 20 }
      },
      scale: { desktop: 1, mobile: 0.55 },
      rotation: 4
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // setScrollY(window.scrollY) // Supprimé car inutilisé
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Modifier la section du Scroll Indicator
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.15], // Disparaît dans les premiers 15% du scroll
    [1, 0]
  );

  return (
    <section
    ref={heroRef}
    className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50/40 via-white to-gray-50/40 dark:from-[#1a0f2e]/80 dark:via-[#140b24]/80 dark:to-[#0f0a1a]/80"
    onMouseMove={handleMouseMove}
  >
    {/* Animated Background Gradient - Plus doux en mode clair */}
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-transparent to-pink-100/30 dark:from-purple-900/30 dark:via-transparent dark:to-pink-900/30 animate-gradient" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.2),transparent_70%)]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  

      {/* Floating Images - Disposition optimisée */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2"
            style={{
              x: `calc(-50% + ${isMobile ? image.position.mobile.x : image.position.desktop.x}rem)`,
              y: `calc(-50% + ${isMobile ? image.position.mobile.y : image.position.desktop.y}rem)`,
              scale: isMobile ? image.scale.mobile : image.scale.desktop,
            }}
            animate={{
              x: `calc(-50% + ${isMobile ? image.position.mobile.x : image.position.desktop.x}rem + ${mousePosition.x * (10 + index * 2)}px)`,
              y: `calc(-50% + ${isMobile ? image.position.mobile.y : image.position.desktop.y}rem + ${mousePosition.y * (10 + index * 2)}px)`,
              rotate: image.rotation,
            }}
            transition={{
              type: "spring",
              stiffness: 100 - index * 5,
              damping: 20 + index * 2,
              mass: 1 + index * 0.1,
            }}
          >
            <div 
              className={`
                relative overflow-hidden rounded-xl md:rounded-2xl
                ${isMobile ? 'w-32 h-32' : 'w-40 h-40 md:w-64 md:h-64'}
                shadow-[0_0_10px_rgba(147,51,234,0.2)] md:shadow-[0_0_15px_rgba(147,51,234,0.3)]
                transform transition-all duration-500
                hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] md:hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]
                ${index % 2 === 0 ? 'hover:rotate-2 md:hover:rotate-3' : 'hover:-rotate-2 md:hover:-rotate-3'}
              `}
              style={{ transform: `rotate(${image.rotation}deg)` }}
            >
              <Image
                src={image.src}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105 md:hover:scale-110"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 256px"
                priority={index < 4}
                quality={isMobile ? 75 : 85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content et Scroll Indicator dans le même conteneur */}
      <motion.div 
        className="relative z-[3] container mx-auto px-4 text-center mt-12 md:mt-0"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6 md:space-y-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold px-2">
            <TypeAnimation
              sequence={[
                t.title,
                3000,
                ...t.sequences.flatMap((text) => [text, 2500]),
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-black dark:text-gray-300/90 px-4"
          >
            {t.subtitle}
          </motion.p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pl-4"
          >
            <Button
              asChild
              size="lg"
              className="relative group overflow-hidden bg-gradient-to-r from-purple-600/90 to-purple-700/90 hover:from-purple-700 hover:to-purple-800 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700"
            >
              <Link href={`/${lang}/contact`}>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 text-white">{t.cta1}</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-purple-500/20 hover:bg-purple-50/30 hover:border-purple-500/30 dark:border-purple-500/50 dark:hover:bg-purple-500/10 text-purple-800 dark:text-purple-300 transition-colors duration-300"
            >
              <Link href={`/${lang}/features`}>
                {t.cta2}
              </Link>
            </Button>
          </motion.div>

          {/* Scroll Indicator intégré dans le même conteneur */}
          <motion.div
            style={{ opacity: scrollOpacity  }}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-16 flex justify-center" // Ajout d'une marge en haut
          >
            <div className="w-8 h-14 border-2 border-purple-500/30 dark:border-purple-300 rounded-full flex justify-center p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
              <motion.div
                className="w-1.5 bg-gradient-to-b from-purple-500/70 to-purple-600/70 dark:from-purple-300 dark:to-pink-300 rounded-full"
                animate={{
                  height: ["20%", "80%"],
                  opacity: [1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <motion.span 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-purple-700 dark:text-purple-300"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Scroll
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
} 