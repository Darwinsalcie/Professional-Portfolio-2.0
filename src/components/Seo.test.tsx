import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import { Seo } from './Seo'

describe('Seo', () => {
  beforeEach(() => {
    document.title = ''
    document.documentElement.lang = ''
    const existing = document.head.querySelectorAll('meta, link[rel="canonical"]')
    existing.forEach((el) => {
      el.remove()
    })
  })

  it('updates document.title, description, canonical link, and html lang', () => {
    render(
      <MemoryRouter initialEntries={['/en/work/alpha-platform']}>
        <Seo
          title="Alpha Platform — Darwin Developer"
          description="Distributed operations platform engineered with React and .NET"
          locale="en"
          siteUrl="https://example.com"
        />
      </MemoryRouter>,
    )

    expect(document.title).toBe('Alpha Platform — Darwin Developer')
    expect(document.documentElement.lang).toBe('en')

    const descMeta = document.head.querySelector('meta[name="description"]')
    expect(descMeta).toHaveAttribute(
      'content',
      'Distributed operations platform engineered with React and .NET',
    )

    const canonicalLink = document.head.querySelector('link[rel="canonical"]')
    expect(canonicalLink).toHaveAttribute('href', 'https://example.com/en/work/alpha-platform')

    const ogTitle = document.head.querySelector('meta[property="og:title"]')
    expect(ogTitle).toHaveAttribute('content', 'Alpha Platform — Darwin Developer')

    const ogLocale = document.head.querySelector('meta[property="og:locale"]')
    expect(ogLocale).toHaveAttribute('content', 'en_US')

    const twitterCard = document.head.querySelector('meta[name="twitter:card"]')
    expect(twitterCard).toHaveAttribute('content', 'summary_large_image')
  })

  it('formats Spanish locale and open graph correctly', () => {
    render(
      <MemoryRouter initialEntries={['/es']}>
        <Seo
          title="Darwin Developer — Portafolio"
          description="Ingeniería y arquitectura de software"
          locale="es"
          siteUrl="https://example.com"
        />
      </MemoryRouter>,
    )

    expect(document.title).toBe('Darwin Developer — Portafolio')
    expect(document.documentElement.lang).toBe('es')

    const ogLocale = document.head.querySelector('meta[property="og:locale"]')
    expect(ogLocale).toHaveAttribute('content', 'es_ES')
  })
})
