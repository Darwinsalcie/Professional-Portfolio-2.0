import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ThemeChoice } from './theme-constants'
import { applyTheme, readStoredChoice, resolveTheme, writeStoredChoice } from './theme'
import { ThemeContext, type ThemeContextValue } from './theme-context'
import { THEME_TOKENS } from './theme-tokens'

const PREFERS_DARK_MQ = '(prefers-color-scheme: dark)'

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia(PREFERS_DARK_MQ).matches
}

export interface ThemeProviderProps {
  children: ReactNode
  defaultChoice?: ThemeChoice
  storage?: Storage
}

export function ThemeProvider({ children, defaultChoice, storage }: ThemeProviderProps) {
  const [choice, setChoiceState] = useState<ThemeChoice>(() => {
    return defaultChoice ?? readStoredChoice(storage)
  })

  const [prefersDark, setPrefersDark] = useState<boolean>(() => getSystemPrefersDark())

  const resolved = useMemo(() => resolveTheme(choice, prefersDark), [choice, prefersDark])

  const setChoice = useCallback(
    (newChoice: ThemeChoice) => {
      setChoiceState(newChoice)
      writeStoredChoice(newChoice, storage)
    },
    [storage],
  )

  // Listen to OS prefers-color-scheme changes only when choice === 'system'
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      choice !== 'system'
    ) {
      return
    }

    const mql = window.matchMedia(PREFERS_DARK_MQ)
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches)
    }

    mql.addEventListener('change', handleChange)
    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [choice])

  // Synchronize DOM attributes and meta theme-color
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    applyTheme(document.documentElement, choice, resolved)

    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    const themeBg = THEME_TOKENS[resolved].bg
    meta.setAttribute('content', themeBg)
  }, [choice, resolved])

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      choice,
      resolved,
      setChoice,
    }),
    [choice, resolved, setChoice],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
