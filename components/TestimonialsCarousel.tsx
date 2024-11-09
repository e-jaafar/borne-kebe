'use client'

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

type Review = {
  name: string
  comment: string
}

type TestimonialsCarouselProps = {
  reviews: Review[]
  title: string
}

export function TestimonialsCarousel({ reviews, title }: TestimonialsCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-[#140b24]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-0 bg-white dark:bg-[#2d1f42] shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col h-full"
                    >
                      {/* Icône de citation */}
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-purple-500 dark:text-purple-400 opacity-50" />
                      </div>

                      {/* Étoiles */}
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-5 w-5 fill-current text-yellow-500"
                            fill="currentColor"
                          />
                        ))}
                      </div>

                      {/* Commentaire */}
                      <p className="flex-1 text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4 italic">
                        &ldquo;{review.comment}&rdquo;
                      </p>


                      {/* Nom */}
                      <div className="mt-auto">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-right">
                          — {review.name}
                        </p>
                      </div>

                      {/* Effet de brillance */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    </motion.div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white dark:bg-[#2d1f42] border-0 shadow-lg hover:bg-gray-50 dark:hover:bg-[#3d2f52]" />
          <CarouselNext className="hidden md:flex -right-12 bg-white dark:bg-[#2d1f42] border-0 shadow-lg hover:bg-gray-50 dark:hover:bg-[#3d2f52]" />
        </Carousel>

        {/* Indicateurs de navigation mobile */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          <div className="w-2 h-2 rounded-full bg-purple-500/50" />
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <div className="w-2 h-2 rounded-full bg-purple-500/50" />
        </div>
      </div>
    </section>
  )
} 