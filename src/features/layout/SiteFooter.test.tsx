import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { SiteFooter } from './SiteFooter'
import { getContent } from '@/content'

describe('SiteFooter', () => {
  const content = getContent('en')

  it('renders status beacon, directory anchors with locale prefix, specs, and dynamic year', () => {
    render(<SiteFooter content={content} locale="en" />)

    expect(screen.getByText(content.footer.beaconText)).toBeInTheDocument()
    expect(screen.getByText(content.meta.availability)).toBeInTheDocument()
    expect(screen.getByText('Directory')).toBeInTheDocument()
    expect(screen.getByText('Direct Lines')).toBeInTheDocument()
    expect(screen.getByText('Specifications')).toBeInTheDocument()

    // Directory links check scoped to directory list
    const directorySection = screen.getByText('Directory').parentElement
    expect(directorySection).not.toBeNull()
    if (directorySection) {
      content.nav.forEach((item) => {
        const link = within(directorySection).getByRole('link', {
          name: new RegExp(`^${item.label}$`, 'i'),
        })
        expect(link).toHaveAttribute('href', `/en${item.href}`)
      })
    }

    // Dynamic current year copyright
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })
})
