import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutSection } from './AboutSection'
import { Portrait } from './Portrait'
import { getContent } from '@/content'

describe('AboutSection', () => {
  const content = getContent('en')

  it('renders section heading, narrative paragraphs, and indexed principles', () => {
    render(<AboutSection about={content.about} meta={content.meta} />)

    expect(screen.getByText(content.about.eyebrow)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: content.meta.name })).toBeInTheDocument()
    expect(screen.getByText(content.about.heading)).toBeInTheDocument()

    content.about.narrative.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })

    content.about.principles.forEach((principle) => {
      expect(screen.getByText(principle.title)).toBeInTheDocument()
      expect(screen.getByText(principle.description)).toBeInTheDocument()
    })
  })
})

describe('Portrait', () => {
  it('renders monogram brand mark in frame when no photo provided', () => {
    const { container } = render(<Portrait initials="NJ" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.getByText(/NJ \/\/ ARCHITECT/)).toBeInTheDocument()
  })

  it('renders image when photo src is provided', () => {
    render(<Portrait src="/portrait.jpg" alt="Owner Portrait" />)
    const img = screen.getByRole('img', { name: /owner portrait/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/portrait.jpg')
  })
})
