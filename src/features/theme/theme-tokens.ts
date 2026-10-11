export type ThemeName = 'dark' | 'light'

export interface ThemePaletteTokens {
  bg: string
  surface: string
  surfaceHover: string
  surfaceRaised: string
  surfaceSunken: string
  control: string
  hairline: string
  hairlineStrong: string
  fg: string
  fgBody: string
  fgMuted: string
  fgSubtle: string
  accent: string
  onAccent: string
  accentHover: string
  onAccentHover: string
  accentFg: string
  eyebrowSecondary: string
  eyebrowTertiary: string
  index: string
  success: string
  danger: string
  focus: string
}

export const THEME_TOKENS: Record<ThemeName, ThemePaletteTokens> = {
  dark: {
    bg: '#131315',
    surface: '#1c1b1d',
    surfaceHover: '#201f21',
    surfaceRaised: 'rgb(19 19 21 / 0.85)',
    surfaceSunken: '#0e0e10',
    control: '#1c1b1d',
    hairline: 'rgb(255 255 255 / 0.08)',
    hairlineStrong: '#434655',
    fg: '#ffffff',
    fgBody: '#e5e1e4',
    fgMuted: '#c4c5d7',
    fgSubtle: '#8e90a0',
    accent: '#1d4ed8',
    onAccent: '#ffffff',
    accentHover: '#b7c4ff',
    onAccentHover: '#002682',
    accentFg: '#b7c4ff',
    eyebrowSecondary: '#b4c5ff',
    eyebrowTertiary: '#7bd0ff',
    index: '#7bd0ff',
    success: '#34d399',
    danger: '#ffb4ab',
    focus: '#b7c4ff',
  },
  light: {
    bg: '#fbfbf9',
    surface: '#ffffff',
    surfaceHover: '#f4f4f1',
    surfaceRaised: 'rgb(251 251 249 / 0.85)',
    surfaceSunken: '#f2f2ef',
    control: '#ffffff',
    hairline: 'rgb(10 10 12 / 0.08)',
    hairlineStrong: 'rgb(10 10 12 / 0.16)',
    fg: '#131315',
    fgBody: '#1c1b1d',
    fgMuted: '#45464f',
    fgSubtle: '#5c5e6b',
    accent: '#1d4ed8',
    onAccent: '#ffffff',
    accentHover: '#1e40af',
    onAccentHover: '#ffffff',
    accentFg: '#1d4ed8',
    eyebrowSecondary: '#0039b5',
    eyebrowTertiary: '#006387',
    index: '#006387',
    success: '#047857',
    danger: '#b3261e',
    focus: '#1d4ed8',
  },
}
