export const THEME_STORAGE_KEY = 'portfolio-theme'

export const THEME_CHOICES = ['light', 'dark', 'system'] as const
export type ThemeChoice = (typeof THEME_CHOICES)[number]

export const RESOLVED_THEMES = ['light', 'dark'] as const
export type ResolvedTheme = (typeof RESOLVED_THEMES)[number]

export const DEFAULT_THEME_CHOICE: ThemeChoice = 'system'
