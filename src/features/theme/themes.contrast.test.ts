import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { compositeAlpha, contrastRatio, parseColor } from '@/lib/contrast'
import { THEME_TOKENS, type ThemeName } from './theme-tokens'

describe('Theme tokens and WCAG AA contrast', () => {
  it('matches tokens declared in themes.css', () => {
    const cssPath = resolve(import.meta.dirname, '../../styles/themes.css')
    const cssContent = readFileSync(cssPath, 'utf-8')

    // Verify key tokens exist in the CSS
    expect(cssContent).toContain('--bg: #131315;')
    expect(cssContent).toContain('--bg: #fbfbf9;')
    expect(cssContent).toContain('--accent: #1d4ed8;')
    expect(cssContent).toContain('--on-accent: #ffffff;')
    expect(cssContent).toContain('--fg-muted: #c4c5d7;')
    expect(cssContent).toContain('--fg-muted: #45464f;')
  })

  const themes: ThemeName[] = ['dark', 'light']

  themes.forEach((theme) => {
    describe(`${theme} palette contrast`, () => {
      const tokens = THEME_TOKENS[theme]

      const bgSolid = tokens.bg
      const surfaceRgba = parseColor(tokens.surface)
      const blended = compositeAlpha(surfaceRgba, parseColor(bgSolid))
      const effectiveSurface =
        surfaceRgba.a < 1
          ? `rgb(${String(blended.r)} ${String(blended.g)} ${String(blended.b)})`
          : tokens.surface

      it('body text has AA contrast (>= 4.5:1) against bg and surface', () => {
        expect(contrastRatio(tokens.fgBody, bgSolid)).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(tokens.fgBody, effectiveSurface)).toBeGreaterThanOrEqual(4.5)
      })

      it('heading text has AA contrast (>= 4.5:1) against bg and surface', () => {
        expect(contrastRatio(tokens.fg, bgSolid)).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(tokens.fg, effectiveSurface)).toBeGreaterThanOrEqual(4.5)
      })

      it('muted text has AA contrast (>= 4.5:1) against bg and surface', () => {
        expect(contrastRatio(tokens.fgMuted, bgSolid)).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(tokens.fgMuted, effectiveSurface)).toBeGreaterThanOrEqual(4.5)
      })

      it('subtle text has AA contrast (>= 4.5:1) against bg and surface', () => {
        expect(contrastRatio(tokens.fgSubtle, bgSolid)).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(tokens.fgSubtle, effectiveSurface)).toBeGreaterThanOrEqual(4.5)
      })

      it('accent fill has AA contrast (>= 4.5:1) for onAccent text', () => {
        expect(contrastRatio(tokens.onAccent, tokens.accent)).toBeGreaterThanOrEqual(4.5)
      })

      it('accent hover has AA contrast (>= 4.5:1) for onAccentHover text', () => {
        expect(contrastRatio(tokens.onAccentHover, tokens.accentHover)).toBeGreaterThanOrEqual(4.5)
      })

      it('accent foreground links have AA contrast (>= 4.5:1) against bg and surface', () => {
        expect(contrastRatio(tokens.accentFg, bgSolid)).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(tokens.accentFg, effectiveSurface)).toBeGreaterThanOrEqual(4.5)
      })

      it('indices have AA contrast (>= 4.5:1) against bg', () => {
        expect(contrastRatio(tokens.index, bgSolid)).toBeGreaterThanOrEqual(4.5)
      })

      it('success indicator has UI contrast (>= 3:1) against bg', () => {
        expect(contrastRatio(tokens.success, bgSolid)).toBeGreaterThanOrEqual(3.0)
      })
    })
  })
})
