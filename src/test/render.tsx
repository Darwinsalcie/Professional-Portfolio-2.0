import type { ReactElement } from 'react'
import { render as rtlRender, type RenderOptions, type RenderResult } from '@testing-library/react'

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return rtlRender(ui, { ...options })
}
