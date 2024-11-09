'use client'

import { Card } from "@/components/ui/card"
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef, useCallback } from 'react'

type Review = {
  name: string
  comment: string
}

type TestimonialsCarouselProps = {
  reviews: Review[]
  title: string
}

export function TestimonialsCarousel({ reviews, title }: TestimonialsCarouselProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplayPlugin.current]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
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

          <div className="relative px-12">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 md:flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-[#2d1f42] border-0 shadow-lg hover:bg-gray-50 dark:hover:bg-[#3d2f52]"
              onClick={scrollPrev}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </button>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 md:flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-[#2d1f42] border-0 shadow-lg hover:bg-gray-50 dark:hover:bg-[#3d2f52]"
              onClick={scrollNext}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 