import { describe, expect, it } from 'vitest'
import { DEFAULT_LOCALE, detectLocale, isLocale, swapLocaleInPath } from './locale'

describe('locale pure utilities', () => {
  describe('isLocale', () => {
    it('returns true for es and en', () => {
      expect(isLocale('es')).toBe(true)
      expect(isLocale('en')).toBe(true)
    })

    it('returns false for unsupported values', () => {
      expect(isLocale('fr')).toBe(false)
      expect(isLocale('')).toBe(false)
      expect(isLocale(null)).toBe(false)
      expect(isLocale(undefined)).toBe(false)
    })
  })

  describe('detectLocale', () => {
    it('prioritizes valid stored preference over navigator languages', () => {
      expect(detectLocale(['en-US'], 'es')).toBe('es')
    })

    it('detects spanish regional locales in navigator.languages', () => {
      expect(detectLocale(['es-CO', 'en-US'], null)).toBe('es')
      expect(detectLocale(['es-MX'], null)).toBe('es')
      expect(detectLocale(['es'], null)).toBe('es')
    })

    it('falls back to default en when no spanish locale is found', () => {
      expect(detectLocale(['fr-FR', 'en-US'], null)).toBe(DEFAULT_LOCALE)
      expect(detectLocale([], null)).toBe(DEFAULT_LOCALE)
    })
  })

  describe('swapLocaleInPath', () => {
    it('swaps locale when path has locale prefix', () => {
      expect(swapLocaleInPath('/es', 'en')).toBe('/en')
      expect(swapLocaleInPath('/en/work/alpha', 'es')).toBe('/es/work/alpha')
    })

    it('prepends locale when path does not have locale prefix', () => {
      expect(swapLocaleInPath('/about', 'es')).toBe('/es/about')
    })
  })
})
