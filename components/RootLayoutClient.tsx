'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center relative"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <Camera className="w-20 h-20 text-primary mx-auto" />
        <motion.div 
          className="absolute inset-0 bg-primary/20 blur-xl"
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.div
        className="mt-8 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full">
          <motion.div
            className="h-full w-1/3 bg-primary rounded-full"
            animate={{
              x: [0, 64, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <p className="text-muted-foreground text-lg font-light tracking-wider">loading...</p>
      </motion.div>
    </motion.div>
  </div>
)

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const preloadResources = async () => {
      try {
        // Précharger les images critiques
        const criticalImages = ['/logo.png', '/hero-bg.jpg']
        await Promise.all(
          criticalImages.map(src => {
            return new Promise((resolve) => {
              const img = new Image()
              img.onload = () => resolve(true)
              img.onerror = () => resolve(false) // Résoudre même en cas d'erreur
              img.src = src
            })
          })
        )
      } catch (error) {
        console.error('Error preloading resources:', error)
      }

      // Ajouter un délai minimum pour éviter un flash
      timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    preloadResources()

    // Fallback de sécurité : forcer le chargement après 3 secondes
    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(fallbackTimeout)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}
