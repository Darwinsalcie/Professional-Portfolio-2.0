import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { MobileNav } from './MobileNav'
import { getContent } from '@/content'
import { ThemeProvider } from '@/features/theme/ThemeProvider'
import { LocaleProvider } from '@/features/i18n/LocaleProvider'

describe('MobileNav', () => {
  const content = getContent('en')

  function renderMobileNav() {
    return render(
      <MemoryRouter initialEntries={['/en']}>
        <LocaleProvider currentLocale="en">
          <ThemeProvider>
            <MobileNav content={content} locale="en" />
          </ThemeProvider>
        </LocaleProvider>
      </MemoryRouter>,
    )
  }

  it('renders trigger button with aria-expanded="false" by default', () => {
    renderMobileNav()
    const trigger = screen.getByRole('button', { name: content.ui.menuOpenAria })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens dialog on trigger click and closes on escape key or link click', async () => {
    const user = userEvent.setup()
    renderMobileNav()

    const trigger = screen.getByRole('button', { name: content.ui.menuOpenAria })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // Expect navigation links inside the drawer
    const workLink = screen.getByRole('link', { name: content.nav[0]?.label })
    expect(workLink).toBeInTheDocument()

    // Clicking a link closes the sheet
    await user.click(workLink)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
