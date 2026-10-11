import {
  DEFAULT_THEME_CHOICE,
  THEME_CHOICES,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeChoice,
} from './theme-constants'

/**
 * Type guard for ThemeChoice.
 */
export function isThemeChoice(value: unknown): value is ThemeChoice {
  return typeof value === 'string' && (THEME_CHOICES as readonly string[]).includes(value)
}

/**
 * Safely reads stored theme choice with fallback.
 */
export function readStoredChoice(
  storage: Pick<Storage, 'getItem'> | null = typeof window !== 'undefined'
    ? window.localStorage
    : null,
): ThemeChoice {
  if (!storage) {
    return DEFAULT_THEME_CHOICE
  }

  try {
    const raw = storage.getItem(THEME_STORAGE_KEY)
    if (isThemeChoice(raw)) {
      return raw
    }
  } catch {
    // Storage access may throw in sandboxed iframes or private browsing
  }

  return DEFAULT_THEME_CHOICE
}

/**
 * Safely writes theme choice to storage.
 */
export function writeStoredChoice(
  choice: ThemeChoice,
  storage: Pick<Storage, 'setItem'> | null = typeof window !== 'undefined'
    ? window.localStorage
    : null,
): void {
  if (!storage) {
    return
  }

  try {
    storage.setItem(THEME_STORAGE_KEY, choice)
  } catch {
    // Storage access may throw in sandboxed iframes or private browsing
  }
}

/**
 * Resolves a ThemeChoice to a concrete ResolvedTheme ('light' | 'dark').
 */
export function resolveTheme(choice: ThemeChoice, prefersDark: boolean): ResolvedTheme {
  if (choice === 'system') {
    return prefersDark ? 'dark' : 'light'
  }
  return choice
}

/**
 * Applies data-theme, data-theme-choice, and color-scheme to the root element.
 */
export function applyTheme(root: HTMLElement, choice: ThemeChoice, resolved: ResolvedTheme): void {
  root.setAttribute('data-theme', resolved)
  root.setAttribute('data-theme-choice', choice)
  root.style.colorScheme = resolved === 'light' ? 'light' : 'dark'
}
