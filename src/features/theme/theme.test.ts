import { describe, expect, it, vi } from 'vitest'
import { DEFAULT_THEME_CHOICE, THEME_STORAGE_KEY, type ThemeChoice } from './theme-constants'
import {
  applyTheme,
  isThemeChoice,
  readStoredChoice,
  resolveTheme,
  writeStoredChoice,
} from './theme'

describe('pure theme logic', () => {
  describe('isThemeChoice', () => {
    it('returns true for all valid theme choices', () => {
      expect(isThemeChoice('light')).toBe(true)
      expect(isThemeChoice('dark')).toBe(true)
      expect(isThemeChoice('system')).toBe(true)
    })

    it('returns false for invalid inputs', () => {
      expect(isThemeChoice('invalid')).toBe(false)
      expect(isThemeChoice('')).toBe(false)
      expect(isThemeChoice(null)).toBe(false)
      expect(isThemeChoice(undefined)).toBe(false)
      expect(isThemeChoice(123)).toBe(false)
      expect(isThemeChoice({})).toBe(false)
    })
  })

  describe('readStoredChoice', () => {
    it('returns stored choice when valid', () => {
      const mockStorage = {
        getItem: vi.fn().mockReturnValue('dark'),
      }
      expect(readStoredChoice(mockStorage)).toBe('dark')
      expect(mockStorage.getItem).toHaveBeenCalledWith(THEME_STORAGE_KEY)
    })

    it('returns default choice when stored value is invalid', () => {
      const mockStorage = {
        getItem: vi.fn().mockReturnValue('invalid-theme'),
      }
      expect(readStoredChoice(mockStorage)).toBe(DEFAULT_THEME_CHOICE)
    })

    it('returns default choice when storage is empty', () => {
      const mockStorage = {
        getItem: vi.fn().mockReturnValue(null),
      }
      expect(readStoredChoice(mockStorage)).toBe(DEFAULT_THEME_CHOICE)
    })

    it('handles storage read errors gracefully', () => {
      const mockStorage = {
        getItem: vi.fn().mockImplementation(() => {
          throw new Error('Access denied')
        }),
      }
      expect(readStoredChoice(mockStorage)).toBe(DEFAULT_THEME_CHOICE)
    })

    it('returns default choice when storage is null', () => {
      expect(readStoredChoice(null)).toBe(DEFAULT_THEME_CHOICE)
    })
  })

  describe('writeStoredChoice', () => {
    it('writes valid choice to storage', () => {
      const mockStorage = {
        setItem: vi.fn(),
      }
      writeStoredChoice('dark', mockStorage)
      expect(mockStorage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, 'dark')
    })

    it('handles storage write errors gracefully', () => {
      const mockStorage = {
        setItem: vi.fn().mockImplementation(() => {
          throw new Error('Storage quota exceeded')
        }),
      }
      expect(() => {
        writeStoredChoice('dark', mockStorage)
      }).not.toThrow()
    })

    it('handles null storage gracefully', () => {
      expect(() => {
        writeStoredChoice('dark', null)
      }).not.toThrow()
    })
  })

  describe('resolveTheme', () => {
    it('resolves system choice based on prefersDark', () => {
      expect(resolveTheme('system', true)).toBe('dark')
      expect(resolveTheme('system', false)).toBe('light')
    })

    it('resolves explicit choices regardless of prefersDark', () => {
      const explicitChoices: ThemeChoice[] = ['light', 'dark']
      for (const choice of explicitChoices) {
        expect(resolveTheme(choice, true)).toBe(choice)
        expect(resolveTheme(choice, false)).toBe(choice)
      }
    })
  })

  describe('applyTheme', () => {
    it('sets attributes and color-scheme for dark theme', () => {
      const root = document.createElement('html')
      applyTheme(root, 'system', 'dark')

      expect(root.getAttribute('data-theme')).toBe('dark')
      expect(root.getAttribute('data-theme-choice')).toBe('system')
      expect(root.style.colorScheme).toBe('dark')
    })

    it('sets attributes and color-scheme for light theme', () => {
      const root = document.createElement('html')
      applyTheme(root, 'light', 'light')

      expect(root.getAttribute('data-theme')).toBe('light')
      expect(root.getAttribute('data-theme-choice')).toBe('light')
      expect(root.style.colorScheme).toBe('light')
    })
  })
})
