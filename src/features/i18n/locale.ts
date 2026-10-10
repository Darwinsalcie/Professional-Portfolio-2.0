export const LOCALES = ['es', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_STORAGE_KEY = 'portfolio-locale'

/**
 * Type guard for Locale.
 */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/**
 * Detects visitor locale based on stored choice and navigator.languages.
 */
export function detectLocale(
  languages: readonly string[] = typeof navigator !== 'undefined' ? navigator.languages : [],
  stored: string | null = typeof localStorage !== 'undefined'
    ? localStorage.getItem(LOCALE_STORAGE_KEY)
    : null,
): Locale {
  if (isLocale(stored)) {
    return stored
  }

  for (const lang of languages) {
    const lower = lang.toLowerCase()
    if (lower === 'es' || lower.startsWith('es-')) {
      return 'es'
    }
  }

  return DEFAULT_LOCALE
}

/**
 * Swaps locale segment in a given URL path without losing subpaths or query/hash.
 */
export function swapLocaleInPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/')
  // If first segment is a locale, replace it
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = targetLocale
    return segments.join('/')
  }
  // Otherwise prepend
  return `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
