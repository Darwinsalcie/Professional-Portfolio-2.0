import { createContext, useContext } from 'react'
import type { Locale } from './locale'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

/**
 * Hook to consume active locale. Throws outside LocaleProvider.
 */
export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
