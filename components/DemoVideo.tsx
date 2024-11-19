'use client'

import { useState, useRef } from 'react'
import { Loader2 } from 'lucide-react'

export function DemoVideo() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleLoadedData = () => {
    setIsLoading(false)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently handle autoplay failure
        if (videoRef.current) {
          videoRef.current.controls = true
        }
      })
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video bg-gray-100 dark:bg-gray-800">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        poster="/videos/hero1.jpg"
        onLoadedData={handleLoadedData}
        onError={() => {
          setIsLoading(false)
          if (videoRef.current) {
            videoRef.current.controls = true
          }
        }}
      >
        <source 
          src="/videos/demonstration.mp4" 
          type="video/mp4"
        />
        <source 
          src="/videos/demonstration.webm" 
          type="video/webm"
        />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  )
} 