import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactSection } from './ContactSection'
import { ContactLinks } from './ContactLinks'
import { getContent } from '@/content'

describe('ContactLinks', () => {
  const content = getContent('en')

  it('renders direct communication links with rel="noopener noreferrer" for external urls', () => {
    render(<ContactLinks links={content.contact.directLinks} />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(content.contact.directLinks.length)

    links.forEach((link) => {
      const href = link.getAttribute('href') ?? ''
      if (!href.startsWith('mailto:')) {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        expect(link).toHaveAttribute('target', '_blank')
      }
    })
  })
})

describe('ContactSection', () => {
  const content = getContent('en')

  it('renders section header, direct channels, and contact form', () => {
    render(<ContactSection contact={content.contact} />)

    expect(
      screen.getByRole('heading', { level: 2, name: content.contact.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(content.contact.eyebrow)).toBeInTheDocument()
    expect(screen.getByText(content.contact.lede)).toBeInTheDocument()

    // Form fields present
    expect(screen.getByLabelText(content.contact.formLabels.name)).toBeInTheDocument()
  })
})
