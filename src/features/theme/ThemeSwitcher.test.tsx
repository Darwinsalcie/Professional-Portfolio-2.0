import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { render } from '@/test/render'
import { THEME_STORAGE_KEY } from './theme-constants'
import { ThemeProvider } from './ThemeProvider'
import { ThemeSwitcher } from './ThemeSwitcher'

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders a role="radiogroup" with accessible name', () => {
    const { getByRole, getAllByRole } = render(
      <ThemeProvider defaultChoice="glass">
        <ThemeSwitcher ariaLabel="Color scheme" />
      </ThemeProvider>,
    )

    const group = getByRole('radiogroup', { name: 'Color scheme' })
    expect(group).toBeInTheDocument()

    const radios = getAllByRole('radio')
    expect(radios).toHaveLength(4)
    expect(getByRole('radio', { name: 'Glass' })).toHaveAttribute('data-state', 'checked')
  })

  it('changes selection on click and persists to storage', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <ThemeProvider defaultChoice="system">
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    const darkRadio = getByRole('radio', { name: 'Dark' })
    await user.click(darkRadio)

    expect(darkRadio).toHaveAttribute('data-state', 'checked')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('supports arrow key navigation and selection between radio items', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <ThemeProvider defaultChoice="light">
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    const lightRadio = getByRole('radio', { name: 'Light' })
    await user.click(lightRadio)
    expect(lightRadio).toHaveFocus()

    await user.keyboard('{ArrowRight}')

    const darkRadio = getByRole('radio', { name: 'Dark' })
    expect(darkRadio).toHaveFocus()

    await user.keyboard(' ')
    expect(darkRadio).toHaveAttribute('data-state', 'checked')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })
})
