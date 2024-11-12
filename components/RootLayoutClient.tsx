'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

const LoadingScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1a0f2e] to-[#140b24] z-50 flex items-center justify-center">
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
          <Camera className="w-20 h-20 text-purple-500 mx-auto" />
          <motion.div 
            className="absolute inset-0 bg-purple-500/20 blur-xl"
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
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500/20 via-purple-500 to-purple-500/20 rounded-full">
            <motion.div
              className="h-full w-1/3 bg-purple-500 rounded-full"
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
          <p className="text-white/70 text-lg font-light tracking-wider">loading...</p>
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
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        children
      )}
    </>
  )
}
