import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { TopologyDiagram } from './TopologyDiagram'
import { getContent } from '@/content'

describe('Hero', () => {
  const content = getContent('en').hero

  it('renders single h1 heading, eyebrow, lede, and dual CTAs', () => {
    render(<Hero content={content} locale="en" />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(content.titleLine1)

    expect(screen.getByText(content.eyebrow)).toBeInTheDocument()
    expect(screen.getByText(content.lede)).toBeInTheDocument()

    const primaryLink = screen.getByRole('link', {
      name: new RegExp(content.primaryCta.label, 'i'),
    })
    expect(primaryLink).toHaveAttribute('href', `/en${content.primaryCta.href}`)

    const secondaryLink = screen.getByRole('link', {
      name: new RegExp(content.secondaryCta.label, 'i'),
    })
    expect(secondaryLink).toHaveAttribute('href', `/en${content.secondaryCta.href}`)
  })
})

describe('TopologyDiagram', () => {
  it('renders SVG graphic with accessible title and desc', () => {
    render(<TopologyDiagram />)
    const svg = screen.getByRole('img')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-labelledby', 'topology-svg-title topology-svg-desc')
    expect(screen.getByText('Operational')).toBeInTheDocument()
  })
})
