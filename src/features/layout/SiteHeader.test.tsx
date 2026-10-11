import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SiteHeader } from './SiteHeader'
import { getContent } from '@/content'
import { ThemeProvider } from '@/features/theme/ThemeProvider'
import { LocaleProvider } from '@/features/i18n/LocaleProvider'

describe('SiteHeader', () => {
  const content = getContent('en')

  function renderHeader() {
    return render(
      <MemoryRouter initialEntries={['/en']}>
        <LocaleProvider currentLocale="en">
          <ThemeProvider>
            <SiteHeader content={content} locale="en" />
          </ThemeProvider>
        </LocaleProvider>
      </MemoryRouter>,
    )
  }

  it('renders brand identity with monogram and owner metadata', () => {
    renderHeader()
    expect(screen.getByText(content.meta.name)).toBeInTheDocument()
    expect(screen.getByText(content.meta.role)).toBeInTheDocument()
  })

  it('renders desktop navigation links with correct hrefs', () => {
    renderHeader()
    const nav = screen.getByRole('navigation', { name: content.ui.headerNavAria })
    expect(nav).toBeInTheDocument()

    content.nav.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        `/en${item.href}`,
      )
    })
  })

  it('renders ThemeSwitcher, LanguageSwitcher, Hire Me button and avatar', () => {
    renderHeader()
    expect(
      screen.getByRole('radiogroup', { name: content.ui.themeSwitcherAria }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('radiogroup', { name: content.ui.langSwitcherAria }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: content.ui.hireMe })).toHaveAttribute(
      'href',
      '/en#contact',
    )
  })
})
