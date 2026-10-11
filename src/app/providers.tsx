import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { ThemeProvider } from '@/features/theme/ThemeProvider'

export interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>{children}</ThemeProvider>
    </MotionConfig>
  )
}
