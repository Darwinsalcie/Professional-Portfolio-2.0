import { describe, expect, it } from 'vitest'
import { compositeAlpha, contrastRatio, parseColor, relativeLuminance } from './contrast'

describe('contrast utilities', () => {
  it('parses various hex color formats', () => {
    expect(parseColor('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(parseColor('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    expect(parseColor('#131315')).toEqual({ r: 19, g: 19, b: 21, a: 1 })
  })

  it('parses rgb and rgba format colors', () => {
    expect(parseColor('rgb(255 255 255 / 0.5)')).toEqual({ r: 255, g: 255, b: 255, a: 0.5 })
    expect(parseColor('rgba(19, 19, 21, 0.85)')).toEqual({ r: 19, g: 19, b: 21, a: 0.85 })
  })

  it('computes relative luminance accurately', () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255, a: 1 })).toBeCloseTo(1, 4)
    expect(relativeLuminance({ r: 0, g: 0, b: 0, a: 1 })).toBeCloseTo(0, 4)
  })

  it('calculates expected contrast ratios', () => {
    // Black and white should be 21:1
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0)
    // Same colors should be 1:1
    expect(contrastRatio('#131315', '#131315')).toBeCloseTo(1, 2)
  })

  it('composites alpha colors over background', () => {
    const semiWhite = { r: 255, g: 255, b: 255, a: 0.5 }
    const black = { r: 0, g: 0, b: 0, a: 1 }
    const blended = compositeAlpha(semiWhite, black)
    expect(blended.r).toBe(128)
    expect(blended.g).toBe(128)
    expect(blended.b).toBe(128)
  })
})
