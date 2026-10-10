import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { THEME_CHOICES, THEME_STORAGE_KEY } from './theme-constants'
import { runThemeInlineScript } from './theme-script'

describe('Theme inline no-flash script', () => {
  it('index.html contains an inline script referencing THEME_STORAGE_KEY and THEME_CHOICES', () => {
    const indexPath = resolve(import.meta.dirname, '../../../index.html')
    const html = readFileSync(indexPath, 'utf-8')

    expect(html).toContain(THEME_STORAGE_KEY)
    for (const choice of THEME_CHOICES) {
      expect(html).toContain(`'${choice}'`)
    }
    expect(html).toContain('data-theme')
    expect(html).toContain('data-theme-choice')
    expect(html).toContain('colorScheme')
  })

  it('evaluates correctly with stored choice', () => {
    const mockStorage = {
      getItem: () => 'light',
    }
    const doc = document.createElement('html')

    runThemeInlineScript(mockStorage, doc)

    expect(doc.getAttribute('data-theme')).toBe('light')
    expect(doc.getAttribute('data-theme-choice')).toBe('light')
    expect(doc.style.colorScheme).toBe('light')
  })

  it('evaluates correctly with storage access throwing', () => {
    const mockStorage = {
      getItem: () => {
        throw new Error('Access denied')
      },
    }
    const doc = document.createElement('html')

    runThemeInlineScript(mockStorage, doc)

    expect(doc.getAttribute('data-theme')).toBe('dark')
    expect(doc.getAttribute('data-theme-choice')).toBe('system')
  })
})
