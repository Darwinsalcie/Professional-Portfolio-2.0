import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CaseStudyPage } from './CaseStudyPage'
import { LocaleRouteLayout } from '@/features/i18n/LocaleRouteLayout'
import { getContent } from '@/content'

describe('CaseStudyPage', () => {
  const content = getContent('en')
  const project = content.projects[0] // why: projects array is guaranteed non-empty by content integrity tests
  if (!project) throw new Error('Missing test project')

  it('renders case study detail when valid slug is provided in URL params', () => {
    render(
      <MemoryRouter initialEntries={[`/en/work/${project.slug}`]}>
        <Routes>
          <Route path="/:lang" element={<LocaleRouteLayout />}>
            <Route path="work/:slug" element={<CaseStudyPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title)
    expect(screen.getByText(content.ui.caseStudyProblemHeading)).toBeInTheDocument()
  })

  it('renders localized NotFound state when unknown slug is provided', () => {
    render(
      <MemoryRouter initialEntries={['/en/work/unknown-non-existent-project']}>
        <Routes>
          <Route path="/:lang" element={<LocaleRouteLayout />}>
            <Route path="work/:slug" element={<CaseStudyPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.ui.notFoundTitle)
    expect(screen.getByText(content.ui.notFoundLede)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: content.ui.returnHome })).toHaveAttribute('href', '/en')
  })
})
