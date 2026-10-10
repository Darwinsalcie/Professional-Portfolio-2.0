import { createContext, useContext } from 'react'
import type { ResolvedTheme, ThemeChoice } from './theme-constants'

export interface ThemeContextValue {
  choice: ThemeChoice
  resolved: ResolvedTheme
  setChoice: (choice: ThemeChoice) => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Hook to consume current theme state and updater.
 * Throws if called outside ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
