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

export function FadeIn({ children, className = '', delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const directions: Record<Direction, DirectionOffset> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  }

  const currentDirection = directions[direction]

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...currentDirection
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : currentDirection.y ?? 0,
        x: isInView ? 0 : currentDirection.x ?? 0
      }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 