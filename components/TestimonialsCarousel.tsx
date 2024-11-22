'use client'

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star } from "lucide-react"
import { FadeIn } from "./ui/motion"
import Autoplay from "embla-carousel-autoplay"

type TestimonialsCarouselProps = {
  reviews: Array<{
    name: string
    comment: string
    rating?: number
    date?: string
  }>
  title: string
}

export function TestimonialsCarousel({ reviews, title }: TestimonialsCarouselProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50 dark:from-[#140b24] dark:via-[#1a0f2e] dark:to-[#140b24] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-700/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full" />
          </div>
        </FadeIn>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="h-full">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-full">
                <FadeIn delay={index * 0.1}>
                  <Card className="p-4 h-[200px] bg-white/80 dark:bg-[#2d1f42]/80 backdrop-blur-sm border border-purple-200/20 dark:border-purple-500/20 hover:border-purple-500/30 dark:hover:border-purple-400/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                    <div className="flex flex-col h-full">
                      {/* En-tête avec rating */}
                      <div className="flex-none flex justify-center">
                        {review.rating && (
                          <div className="flex gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-purple-500 text-purple-500"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Corps du témoignage */}
                      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent px-2 flex items-center">
                        <p className="text-gray-700 dark:text-gray-200 italic text-sm text-center w-full">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </div>

                      {/* Pied de carte */}
                      <div className="flex-none pt-2 mt-auto border-t border-purple-200/20 dark:border-purple-500/20">
                        <div className="flex justify-center items-center text-xs gap-2">
                          <span className="font-semibold text-purple-700 dark:text-purple-400">
                            {review.name}
                          </span>
                          {review.date && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white/80 dark:bg-[#2d1f42]/80 border-purple-200/20 dark:border-purple-500/20 hover:bg-purple-50 dark:hover:bg-purple-900/30" />
          <CarouselNext className="hidden md:flex -right-12 bg-white/80 dark:bg-[#2d1f42]/80 border-purple-200/20 dark:border-purple-500/20 hover:bg-purple-50 dark:hover:bg-purple-900/30" />
        </Carousel>
      </div>
    </section>
  )
} 