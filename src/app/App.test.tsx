import { describe, expect, it } from 'vitest'
import { render } from '@/test/render'
import { App } from './App'

describe('App', () => {
  it('renders the application headline', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Professional Portfolio 2.0')
  })
})
