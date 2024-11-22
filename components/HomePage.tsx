"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Camera, Zap, Mail, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { DemoVideo } from "@/components/DemoVideo";
import { FadeIn } from "@/components/ui/motion";
import { type HomePageTranslations } from "@/types/translations";
import { motion, useScroll, useTransform } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { MasonryGrid } from "@/components/MasonryGrid";
import { TypeAnimation } from "react-type-animation";
import { HowItWorks } from "@/components/HowItWorks";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { useMediaQuery } from '@/hooks/useMediaQuery'

// Ajouter le type pour window.navigator
declare global {
  interface Navigator {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  }
}

type HomePageProps = {
  lang: string;
  translations: HomePageTranslations;
};

// Type pour les images
type LocalImage = {
  src: string;
  alt: string;
};

export function HomePage({ lang, translations: t }: HomePageProps) {
  // États
  const [galleryImages, setGalleryImages] = useState<LocalImage[]>([]);
  const [init, setInit] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  // const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [showScroll, setShowScroll] = useState(true);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  
  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Media queries et détection des performances
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isLowEnd = useCallback(() => {
    if (typeof window === 'undefined' || !navigator) return false;
    return (
      (navigator.deviceMemory && navigator.deviceMemory < 4) ||
      (navigator.hardwareConcurrency || 4) <= 4
    );
  }, []);

  const shouldReduceMotion = isReducedMotion || isMobile || isLowEnd() || isLowPerfDevice

  // Scroll et animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Initialisation des particules
  useEffect(() => {
    const initParticles = async () => {
      try {
        await initParticlesEngine(async (engine) => {
          await loadFull(engine);
        });
        setInit(true);
      } catch (error) {
        console.error('Error initializing particles:', error);
      }
    };

    initParticles();
  }, []);

  // Chargement des images
  useEffect(() => {
    // Fonction pour charger les images
    const loadImages = async () => {
      try {
        const response = await fetch("/api/getImages");
        const images = await response.json();
        setGalleryImages(images);
      } catch (error) {
        console.error("Erreur lors du chargement des images:", error);
      }
    };

    loadImages();
  }, []);

  // Gestion du bouton scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion du scroll pour le bouton CTA
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Détecte quand on est proche du bas (par exemple, à 100px du bas)
      const nearBottom = documentHeight - (scrollTop + windowHeight) < 100;
      setIsNearBottom(nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détection des performances du dispositif
  useEffect(() => {
    const checkPerformance = () => {
      if (typeof window === 'undefined' || !navigator) return;
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const cpuCores = navigator.hardwareConcurrency || 1;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lowMemory = Boolean(navigator.deviceMemory && navigator.deviceMemory < 4);
      
      const isLowPerf = Boolean(
        isMobile || 
        cpuCores <= 2 || 
        prefersReducedMotion || 
        lowMemory
      );
      
      setIsLowPerfDevice(isLowPerf);
    };

    checkPerformance();
  }, []);

  // Configuration des particules avec les types corrects
  const particlesConfig = {
    particles: {
      number: {
        value: shouldReduceMotion ? 20 : 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#9333ea", "#ffffff"]
      },
      links: {
        color: "#9333ea",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: !shouldReduceMotion,
        speed: 0.3,
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: {
          default: "bounce" as const
        }
      },
      size: {
        value: { min: 1, max: 3 }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: !shouldReduceMotion,
          mode: "grab"
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.2
          }
        }
      }
    },
    detectRetina: !shouldReduceMotion,
    fullScreen: false,
    fpsLimit: shouldReduceMotion ? 30 : 60
  };

  return (
    <main className="relative">
      {init && !shouldReduceMotion && (
        <Particles
          id="tsparticles"
          className="fixed inset-0 z-0"
          options={particlesConfig}
        />
      )}

      {/* Hero Section avec Parallax */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen md:min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0 w-full h-full"
          style={{ scale: imageScale }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/videos/hero1.jpg"
              alt="Photobooth professionnel en action"
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
              // style={{
              //   transform: shouldReduceMotion ? 'none' : `translate(${
              //     (mousePosition.x - 0.5) * 10
              //   }px, ${(mousePosition.y - 0.5) * 10}px)`
              // }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90 dark:from-[#1a0f2e]/90 dark:via-[#1a0f2e]/70 dark:to-[#1a0f2e]/90 backdrop-blur-[2px]" />
          </div>
        </motion.div>

        {/* Contenu optimisé pour mobile */}
        <div className="relative z-30 container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center space-y-8 md:space-y-6 text-center pt-20 md:pt-0 min-h-[60vh] md:min-h-0 justify-center"
          >
            <header className="space-y-6 md:space-y-4 max-w-[800px] mx-auto">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <TypeAnimation
                  sequence={[
                    t.hero.title,
                    3000,
                    ...t.hero.sequences.flatMap((text) => [text, 2500]),
                  ]}
                  wrapper="span"
                  speed={30}
                  deletionSpeed={30}
                  repeat={Infinity}
                  cursor={true}
                  className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-purple-200 bg-clip-text text-transparent transition-all duration-300"
                />
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-100 max-w-[90%] mx-auto leading-relaxed px-4 md:px-0 transition-colors duration-300"
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
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto py-6 sm:py-4 text-base sm:text-lg border-2 
                  dark:border-white dark:text-white 
                  border-gray-800 text-gray-800 
                  bg-white/10 backdrop-blur-sm
                  hover:bg-white/20 dark:hover:bg-white/10 
                  transition-all duration-300"
              >
                <Link href={`/${lang}/features`}>{t.hero.cta2}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        {/* Indicateur de scroll amélioré */}
        <motion.div
          className="absolute bottom-24 left-0 right-0 mx-auto z-30 flex flex-col items-center justify-center w-fit"
          initial={{ opacity: 1 }}
          animate={{
            opacity: showScroll ? 1 : 0,
            y: showScroll ? 0 : 20,
          }}
          transition={{
            duration: 0.3,
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
      <section className="relative z-10 w-full py-24 bg-gradient-to-b from-white/80 to-gray-50/80 dark:from-[#1a0f2e]/80 dark:to-[#140b24]/80">
        {/* Particules de fond améliorées */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/5 via-purple-400/5 to-transparent dark:from-purple-500/10 dark:via-purple-400/5 dark:to-transparent rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-purple-700/5 via-purple-600/5 to-transparent dark:from-purple-700/10 dark:via-purple-600/5 dark:to-transparent rounded-full blur-[120px] animate-pulse-slower" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>

            <div className="text-center mb-20">
  <span className="inline-block text-base font-medium text-purple-600 dark:text-purple-400 mb-6 tracking-wide uppercase relative">
    <span className="absolute left-0 right-0 h-[1px] bottom-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

  </span>
  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r text-purple-600 dark:text-purple-400 mb-6 tracking-wide uppercase relative from-gray-900 to-gray-600 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
    {t.why.title}
  </h2>
  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300/90 max-w-3xl mx-auto">
    {t.why.description}
  </p>
</div>

          </FadeIn>

          {/* Vidéo avec meilleur design et halo */}
          <div className="mb-20 max-w-4xl mx-auto perspective-1000 relative z-30">
            <FadeIn>
              {/* Halo radieux */}
              <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/30 via-purple-400/20 to-purple-600/30 rounded-[30px] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 backdrop-blur-sm group"
              >
                {/* Effet de brillance supplémentaire */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-20 pointer-events-none" />

                {/* Effet de halo animé */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 via-fuchsia-500/50 to-purple-600/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />

                <div className="relative z-30">
                  <DemoVideo />
                </div>

                {/* Gradient du bas plus subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f2e] via-transparent to-transparent opacity-30 pointer-events-none" />

                {/* Effet de scintillement */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
              </motion.div>
            </FadeIn>
          </div>

          {/* Grille des avantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t.why.items.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative group h-full"
                >
                  {/* Effet de halo amélioré */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-purple-500/5 to-purple-800/10 dark:from-purple-600/20 dark:via-purple-500/10 dark:to-purple-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />

                  <div className="relative bg-white/80 dark:bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-purple-500/10 hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-300 h-[220px] flex flex-col justify-between group shadow-sm hover:shadow-xl">
                    {/* Icône numérotée avec animation */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-white">
                          {index + 1}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Texte avec meilleur contraste */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors mt-6">
                      {item}
                    </h3>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* CTA amélioré */}
          <FadeIn delay={0.4}>
            <div className="text-center mt-20 relative z-50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group px-8 py-6"
                >
                  <Link href={`/${lang}/contact`} className="relative z-50">
                    <span className="relative z-10 flex items-center gap-2 text-lg pointer-events-auto">
                      {t.why.cta}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
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
            <div className="text-center mb-16">
              <h2 className="text-foreground text-3xl font-bold">
                {t.features.title}
              </h2>
              <p className="text-muted-foreground">
                {t.features.subtitle}
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.items.slice(0, 3).map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5,
                    translateZ: 20,
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
                          {index === 0 && (
                            <Users className="h-8 w-8 text-white" />
                          )}
                          {index === 1 && (
                            <Camera className="h-8 w-8 text-white" />
                          )}
                          {index === 2 && (
                            <Zap className="h-8 w-8 text-white" />
                          )}

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
      <TestimonialsCarousel reviews={t.reviews.items} title={t.reviews.title} />

      {/* Gallery Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-foreground text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                {t.gallery.title}
              </h2>
              <p className="text-muted-foreground text-xl">
                {t.gallery.subtitle}
              </p>
            </div>
          </FadeIn>

          <MasonryGrid images={galleryImages} />
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
                <Link href={`/${lang}/contact`}>{t.contact.cta}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Floating Contact Button avec animation de translation */}
      <div
        className={`fixed bottom-8 right-8 z-50 hidden md:block transition-transform duration-300 ${
          isNearBottom ? "translate-y-[-100px]" : "translate-y-0"
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
                <span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white/80
                  origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                />
              </span>
            </span>
          </Link>
        </Button>
      </div>

      {/* Scroll to Top Button - Repositionné */}
      <div
        className={`fixed md:bottom-8 md:left-8 bottom-20 left-4 z-50 transition-all duration-500 ease-in-out ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          size="icon"
          aria-label="Retour en haut de la page"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full w-10 h-10 p-0
            transform transition-all duration-300 hover:scale-110
            hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
            relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"
            aria-hidden="true"
          />
          <ArrowUp className="w-5 h-5 relative z-10" aria-hidden="true" />
        </Button>
      </div>
    </main>
  );
}
