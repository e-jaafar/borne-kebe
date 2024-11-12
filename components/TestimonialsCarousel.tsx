'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

type Review = {
  name: string
  comment: string
}

type TestimonialsCarouselProps = {
  reviews: Review[]
  title: string
}

export function TestimonialsCarousel({ reviews, title }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplayPlugin.current]
  )

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  return (
    <section className="w-full py-24 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
              {title}
            </h2>
          </motion.div>

          <div className="relative px-4 md:px-12">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {reviews.map((review, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                    <div className="p-1">
                      <Card className="border-0 bg-white dark:bg-[#2d1f42] shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex flex-col h-full"
                        >
                          <div className="mb-4">
                            <Quote className="w-8 h-8 text-purple-500 dark:text-purple-400 opacity-50" />
                          </div>

                          <div className="flex items-center space-x-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="h-5 w-5 fill-current text-yellow-500"
                                fill="currentColor"
                              />
                            ))}
                          </div>

                          <p className="flex-1 text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4 italic">
                            &ldquo;{review.comment}&rdquo;
                          </p>

                          <div className="mt-auto">
                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-right">
                              — {review.name}
                            </p>
                          </div>
                        </motion.div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 dark:bg-[#2d1f42]/80 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:bg-white dark:hover:bg-[#3d2f52] backdrop-blur-sm transition-all duration-300 group"
              onClick={scrollPrev}
              aria-label="Slide précédente"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
            </button>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 dark:bg-[#2d1f42]/80 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:bg-white dark:hover:bg-[#3d2f52] backdrop-blur-sm transition-all duration-300 group"
              onClick={scrollNext}
              aria-label="Slide suivante"
            >
              <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
            </button>

            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-6 bg-purple-500 dark:bg-purple-400' 
                      : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-purple-300 dark:hover:bg-purple-600'
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Aller à la slide ${index + 1}`}
                >
                  <span className="sr-only">Slide {index + 1}</span>
                </motion.button>
              ))}
            </div>

            <div className="absolute -bottom-6 right-4 text-sm text-gray-500 dark:text-gray-400 hidden md:block">
              <span className="font-medium text-purple-600 dark:text-purple-400">{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{reviews.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 