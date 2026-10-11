import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ProjectsSection } from './ProjectsSection'
import { ProjectCard } from './ProjectCard'
import { getContent } from '@/content'

describe('ProjectsSection', () => {
  const content = getContent('en')

  function renderProjects() {
    return render(
      <MemoryRouter initialEntries={['/en']}>
        <ProjectsSection projects={content.projects} ui={content.ui} locale="en" />
      </MemoryRouter>,
    )
  }

  it('renders section header with eyebrow, title, and lede', () => {
    renderProjects()
    expect(screen.getByText(content.ui.projectsEyebrow)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: content.ui.projectsTitle }),
    ).toBeInTheDocument()
    expect(screen.getByText(content.ui.projectsLede)).toBeInTheDocument()
  })

  it('renders cards for all featured projects with case study links', () => {
    renderProjects()
    content.projects.forEach((project) => {
      expect(screen.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument()
      expect(screen.getByText(project.domain)).toBeInTheDocument()
    })
  })
})

describe('ProjectCard', () => {
  const project = getContent('en').projects[0]
  if (!project) {
    throw new Error('Expected at least one project in test content')
  }

  it('renders project metadata, tags, and case study link', () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <ProjectCard project={project} locale="en" viewCaseStudyLabel="View Case Study" />
      </MemoryRouter>,
    )

    expect(screen.getByText(project.title)).toBeInTheDocument()
    expect(screen.getByText(project.domain)).toBeInTheDocument()
    project.stack.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })

    const caseStudyLink = screen.getByRole('link', { name: /view case study/i })
    expect(caseStudyLink).toHaveAttribute('href', `/en/work/${project.slug}`)
  })
})
