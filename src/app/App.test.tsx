import { describe, expect, it } from 'vitest'
import { render } from '@/test/render'
import { App } from './App'

describe('App', () => {
  it('renders the application shell and navigates to the localized home page', async () => {
    const { findByRole } = render(<App />)
    const heading = await findByRole('heading', { level: 1 }, { timeout: 5000 })
    expect(heading).toHaveTextContent(/Full-Stack/i)
  })
})
