import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/Card'
import { Chip } from '@/components/Chip'
import { SectionHeader } from '@/components/SectionHeader'
import { IndexNumber } from '@/components/IndexNumber'
import { StatusBeacon } from '@/components/StatusBeacon'
import { Monogram } from '@/components/Monogram'
import { VisuallyHidden } from '@/components/VisuallyHidden'

describe('UI Primitives', () => {
  describe('Button', () => {
    it('renders primary variant by default with a button element', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-accent')
    })

    it('renders asChild using slot semantics (e.g. as an anchor)', () => {
      render(
        <Button asChild variant="ghost">
          <a href="/test">Link Button</a>
        </Button>,
      )
      const link = screen.getByRole('link', { name: /link button/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveClass('backdrop-blur-xl')
    })

    it('renders mono variant with custom styles', () => {
      render(<Button variant="mono">Read More</Button>)
      const button = screen.getByRole('button', { name: /read more/i })
      expect(button).toHaveClass('font-mono')
    })
  })

  describe('Card', () => {
    it('renders div surface card by default', () => {
      const { container } = render(<Card>Card content</Card>)
      expect(container.firstChild).toHaveClass('rounded-card', 'bg-surface')
    })

    it('renders panel variant with custom semantic element', () => {
      render(
        <Card as="article" variant="panel">
          Panel article
        </Card>,
      )
      const article = screen.getByRole('article')
      expect(article).toBeInTheDocument()
      expect(article).toHaveClass('rounded-panel')
    })
  })

  describe('Chip', () => {
    it('renders default chip variant', () => {
      render(<Chip>React 19</Chip>)
      const el = screen.getByText('React 19')
      expect(el).toHaveClass('rounded-chip')
      expect(el).toHaveClass('text-label-caps')
    })

    it('renders ledger chip variant', () => {
      render(<Chip variant="ledger">.NET 8</Chip>)
      const el = screen.getByText('.NET 8')
      expect(el).toHaveClass('rounded-lg')
      expect(el).toHaveClass('text-body-sm')
    })
  })

  describe('SectionHeader', () => {
    it('renders eyebrow, h2 title and description', () => {
      render(
        <SectionHeader
          eyebrow="Capabilities"
          eyebrowTone="secondary"
          title="Specialized Consulting"
          description="Detailed overview"
          titleId="sec-title"
        />,
      )
      expect(screen.getByText('Capabilities')).toHaveClass('text-eyebrow-secondary')
      const heading = screen.getByRole('heading', { level: 2, name: /specialized consulting/i })
      expect(heading).toHaveAttribute('id', 'sec-title')
      expect(screen.getByText('Detailed overview')).toBeInTheDocument()
    })
  })

  describe('IndexNumber', () => {
    it('pads single-digit index with leading zero', () => {
      render(<IndexNumber value={3} />)
      expect(screen.getByText('03')).toHaveClass('font-mono', 'text-index')
    })
  })

  describe('StatusBeacon', () => {
    it('renders indicator with accessible label', () => {
      render(<StatusBeacon status="success" label="Operational" />)
      expect(screen.getByText('Operational')).toBeInTheDocument()
    })
  })

  describe('Monogram', () => {
    it('renders SVG brand mark with hidden text', () => {
      const { container } = render(<Monogram initials="NJ" />)
      expect(container.querySelector('svg')).toBeInTheDocument()
      expect(screen.getByText('NJ')).toHaveClass('sr-only')
    })
  })

  describe('VisuallyHidden', () => {
    it('renders visually hidden content readable by screen reader', () => {
      render(<VisuallyHidden>Skip to main</VisuallyHidden>)
      const el = screen.getByText('Skip to main')
      expect(el).toHaveClass('[clip:rect(0,0,0,0)]')
    })
  })
})
