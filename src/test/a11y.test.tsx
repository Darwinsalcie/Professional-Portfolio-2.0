import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { HomePage } from '@/pages/HomePage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ThemeProvider } from '@/features/theme/ThemeProvider'
import { LocaleProvider } from '@/features/i18n/LocaleProvider'
import type { ThemeChoice } from '@/features/theme/theme-constants'

const themes: ThemeChoice[] = ['light', 'dark']

describe('Accessibility audits (axe-core)', () => {
  themes.forEach((theme) => {
    describe(`Theme: ${theme}`, () => {
      it('HomePage has no accessibility violations', async () => {
        const { container } = render(
          <ThemeProvider defaultChoice={theme}>
            <LocaleProvider currentLocale="en">
              <MemoryRouter initialEntries={['/en']}>
                <main>
                  <Routes>
                    <Route path="/:locale" element={<HomePage />} />
                  </Routes>
                </main>
              </MemoryRouter>
            </LocaleProvider>
          </ThemeProvider>,
        )

        const results = await axe(container)
        expect(results.violations).toEqual([])
      })

      it('CaseStudyPage has no accessibility violations', async () => {
        const { container } = render(
          <ThemeProvider defaultChoice={theme}>
            <LocaleProvider currentLocale="en">
              <MemoryRouter initialEntries={['/en/work/alpha-platform']}>
                <main>
                  <Routes>
                    <Route path="/:locale/work/:slug" element={<CaseStudyPage />} />
                  </Routes>
                </main>
              </MemoryRouter>
            </LocaleProvider>
          </ThemeProvider>,
        )

        const results = await axe(container)
        expect(results.violations).toEqual([])
      })

      it('NotFoundPage has no accessibility violations', async () => {
        const { container } = render(
          <ThemeProvider defaultChoice={theme}>
            <LocaleProvider currentLocale="en">
              <MemoryRouter initialEntries={['/404']}>
                <main>
                  <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
              </MemoryRouter>
            </LocaleProvider>
          </ThemeProvider>,
        )

        const results = await axe(container)
        expect(results.violations).toEqual([])
      })
    })
  })
})
