import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/cn'

export interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  duration?: number
  yOffset?: number
}

/**
 * Scroll-triggered reveal wrapper respecting user reduced motion preferences.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.45,
  yOffset = 20,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
