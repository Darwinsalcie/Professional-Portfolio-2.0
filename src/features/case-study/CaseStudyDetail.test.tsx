import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CaseStudyDetail } from './CaseStudyDetail'
import { getContent } from '@/content'

describe('CaseStudyDetail', () => {
  const content = getContent('en')
  const project = content.projects[0] // why: projects array guaranteed non-empty by content tests
  if (!project) throw new Error('Missing test project')
  const nextProject = content.projects[1]

  it('renders header, metadata sidebar, and indexed sections', () => {
    render(
      <MemoryRouter>
        <CaseStudyDetail project={project} locale="en" ui={content.ui} nextProject={nextProject} />
      </MemoryRouter>,
    )

    // Heading
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(project.title)

    // Domain tag & Index
    expect(screen.getByText(new RegExp(project.domain, 'i'))).toBeInTheDocument()
    expect(screen.getByText(/01 \/\/ CASE STUDY/i)).toBeInTheDocument()

    // Problem, Approach, Architecture, Outcomes
    expect(screen.getByText(content.ui.caseStudyProblemHeading)).toBeInTheDocument()
    expect(screen.getByText(project.caseStudy.problem)).toBeInTheDocument()
    expect(screen.getByText(content.ui.caseStudyApproachHeading)).toBeInTheDocument()
    const firstApproach = project.caseStudy.approach[0]
    expect(firstApproach).toBeDefined()
    if (firstApproach) {
      expect(screen.getByText(firstApproach)).toBeInTheDocument()
    }

    // Sidebar metadata
    expect(screen.getByText(content.ui.caseStudyRole)).toBeInTheDocument()
    expect(screen.getByText(project.role)).toBeInTheDocument()
    expect(screen.getByText(project.timeline)).toBeInTheDocument()

    // Next pager
    expect(screen.getByText(content.ui.caseStudyNext)).toBeInTheDocument()
    if (nextProject) {
      expect(screen.getByText(nextProject.title)).toBeInTheDocument()
    }
  })

  it('renders external links with noopener noreferrer', () => {
    render(
      <MemoryRouter>
        <CaseStudyDetail project={project} locale="en" ui={content.ui} />
      </MemoryRouter>,
    )

    if (project.links?.live) {
      const liveLink = screen.getByRole('link', {
        name: new RegExp(content.ui.caseStudyLiveLink, 'i'),
      })
      expect(liveLink).toHaveAttribute('href', project.links.live)
      expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(liveLink).toHaveAttribute('target', '_blank')
    }
  })
})
