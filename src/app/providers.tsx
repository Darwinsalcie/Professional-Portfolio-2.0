import type { ReactNode } from 'react'
import { ThemeProvider } from '@/features/theme/ThemeProvider'

export interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>
}
