import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ServicesSection } from './ServicesSection'
import { ServiceCard } from './ServiceCard'
import { getContent } from '@/content'

describe('ServicesSection', () => {
  const content = getContent('en')

  function renderServices() {
    return render(<ServicesSection services={content.services} ui={content.ui} locale="en" />)
  }

  it('renders section header with eyebrow, title, and lede', () => {
    renderServices()
    expect(screen.getByText(content.ui.servicesEyebrow)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: content.ui.servicesTitle }),
    ).toBeInTheDocument()
    expect(screen.getByText(content.ui.servicesLede)).toBeInTheDocument()
  })

  it('renders all services with benefit items and CTAs', () => {
    renderServices()
    content.services.forEach((service) => {
      expect(screen.getByRole('heading', { level: 3, name: service.title })).toBeInTheDocument()
      expect(screen.getByText(service.summary)).toBeInTheDocument()
    })
  })
})

describe('ServiceCard', () => {
  const service = getContent('en').services[0]
  if (!service) {
    throw new Error('Expected at least one service in test content')
  }

  it('renders icon, benefits list, and contact CTA', () => {
    render(<ServiceCard service={service} locale="en" consultLabel="Consult on a project" />)

    expect(screen.getByText(service.title)).toBeInTheDocument()
    expect(screen.getByText(service.summary)).toBeInTheDocument()
    service.benefits.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeInTheDocument()
    })

    const ctaLink = screen.getByRole('link', { name: /consult on a project/i })
    expect(ctaLink).toHaveAttribute('href', '/en#contact')
  })
})
