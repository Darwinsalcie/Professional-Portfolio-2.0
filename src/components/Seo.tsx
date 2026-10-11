import { useEffect } from 'react'
import { useLocation } from 'react-router'
import type { Locale } from '@/features/i18n/locale'

export interface SeoProps {
  title: string
  description: string
  locale: Locale
  pathname?: string
  siteUrl?: string
  ogImage?: string
  type?: 'website' | 'article'
}

/**
 * Headless Seo component that synchronizes HTML document metadata:
 * - document.title
 * - meta description
 * - canonical link tag
 * - OpenGraph tags (title, description, url, type, locale, image)
 * - Twitter Card tags
 */
export function Seo({
  title,
  description,
  locale,
  pathname,
  siteUrl = 'https://example.com',
  ogImage = '/images/og-default.png',
  type = 'website',
}: SeoProps) {
  const location = useLocation()
  const activePath = pathname ?? location.pathname
  const canonicalUrl = `${siteUrl.replace(/\/$/, '')}${activePath}`
  const fullOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${siteUrl.replace(/\/$/, '')}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`

  useEffect(() => {
    // 1. Update Document Title
    document.title = title

    // Helper to ensure meta tag exists and update its content
    function setMeta(
      selector: string,
      attributeName: string,
      attributeValue: string,
      content: string,
    ) {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attributeName, attributeValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Helper to ensure link tag exists and update its href
    function setLink(rel: string, href: string) {
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }
      element.setAttribute('href', href)
    }

    // 2. Standard Meta Tags
    setMeta('meta[name="description"]', 'name', 'description', description)

    // 3. Canonical Tag
    setLink('canonical', canonicalUrl)

    // 4. Open Graph Tags
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta(
      'meta[property="og:locale"]',
      'property',
      'og:locale',
      locale === 'es' ? 'es_ES' : 'en_US',
    )
    setMeta('meta[property="og:image"]', 'property', 'og:image', fullOgImage)

    // 5. Twitter Card Tags
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', fullOgImage)

    // 6. Root HTML lang attribute
    document.documentElement.lang = locale
  }, [title, description, canonicalUrl, fullOgImage, locale, type])

  return null
}
