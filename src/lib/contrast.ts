export interface RgbaColor {
  r: number
  g: number
  b: number
  a: number
}

/**
 * Parses hex (#rgb, #rgba, #rrggbb, #rrggbbaa) or rgb/rgba CSS color strings.
 */
export function parseColor(input: string): RgbaColor {
  const trimmed = input.trim().toLowerCase()

  // Hex color
  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1)
    if (hex.length === 3 || hex.length === 4) {
      const c0 = hex[0] ?? '0'
      const c1 = hex[1] ?? '0'
      const c2 = hex[2] ?? '0'
      const c3 = hex[3] ?? 'f'
      const r = parseInt(c0 + c0, 16)
      const g = parseInt(c1 + c1, 16)
      const b = parseInt(c2 + c2, 16)
      const a = hex.length === 4 ? parseInt(c3 + c3, 16) / 255 : 1
      return { r, g, b, a }
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
      return { r, g, b, a }
    }
    throw new Error(`Unsupported hex color format: ${input}`)
  }

  // rgb(r g b / a) or rgb(r, g, b) or rgba(r, g, b, a)
  const rgbRegex =
    /^rgba?\(\s*([\d.]+)\s*(?:,|\s+)\s*([\d.]+)\s*(?:,|\s+)\s*([\d.]+)(?:\s*(?:,|\/)\s*([\d.]+%?))?\s*\)$/
  const rgbMatch = rgbRegex.exec(trimmed)
  if (rgbMatch) {
    const r = parseFloat(rgbMatch[1] ?? '0')
    const g = parseFloat(rgbMatch[2] ?? '0')
    const b = parseFloat(rgbMatch[3] ?? '0')
    let a = 1
    const alphaStr = rgbMatch[4]
    if (alphaStr) {
      if (alphaStr.endsWith('%')) {
        a = parseFloat(alphaStr.slice(0, -1)) / 100
      } else {
        a = parseFloat(alphaStr)
      }
    }
    return { r, g, b, a }
  }

  throw new Error(`Unsupported color format: ${input}`)
}

/**
 * Composites foreground over background given standard alpha blending.
 */
export function compositeAlpha(fg: RgbaColor, bg: RgbaColor): RgbaColor {
  const alpha = fg.a + bg.a * (1 - fg.a)
  if (alpha === 0) {
    return { r: 0, g: 0, b: 0, a: 0 }
  }

  const r = Math.round((fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha)
  const g = Math.round((fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha)
  const b = Math.round((fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha)

  return { r, g, b, a: alpha }
}

/**
 * Calculates WCAG 2.1 relative luminance for an RGB color.
 */
export function relativeLuminance(color: RgbaColor): number {
  const normalize = (channel: number): number => {
    const srgb = channel / 255
    return srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4)
  }

  const r = normalize(color.r)
  const g = normalize(color.g)
  const b = normalize(color.b)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculates the WCAG 2.1 contrast ratio between two colors (fg over bg).
 */
export function contrastRatio(foreground: string, background: string): number {
  const fgColor = parseColor(foreground)
  const bgColor = parseColor(background)

  const effectiveFg = fgColor.a < 1 ? compositeAlpha(fgColor, bgColor) : fgColor

  const l1 = relativeLuminance(effectiveFg)
  const l2 = relativeLuminance(bgColor)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}
