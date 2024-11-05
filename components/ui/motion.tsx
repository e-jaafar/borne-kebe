'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

type DirectionOffset = {
  x?: number
  y?: number
}

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
}

export const FadeIn = ({ 
  children, 
  delay = 0,
  direction = "up",
  className = "",
  ...props 
}: FadeInProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
        x: direction === "left" ? 20 : direction === "right" ? -20 : 0
      }}
      whileInView={{ 
        opacity: 1,
        y: 0,
        x: 0
      }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
} 