import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LOCALE_STORAGE_KEY, type Locale } from './locale'
import { LocaleContext, type LocaleContextValue } from './locale-context'

export interface LocaleProviderProps {
  children: ReactNode
  currentLocale: Locale
}

export function LocaleProvider({ children, currentLocale }: LocaleProviderProps) {
  const [overrideLocale, setOverrideLocale] = useState<Locale | null>(null)

  const locale = overrideLocale ?? currentLocale

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = useCallback((newLocale: Locale) => {
    setOverrideLocale(newLocale)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
    } catch {
      // Ignore storage errors in private browsing or quota limits
    }
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
