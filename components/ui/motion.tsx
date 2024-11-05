'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { HTMLMotionProps } from 'framer-motion'

type FadeInProps = {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition">

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