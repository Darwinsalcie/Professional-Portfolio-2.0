import { describe, expect, it } from 'vitest'
import { getContent } from './index'

describe('Content model integrity tests', () => {
  const contentEs = getContent('es')
  const contentEn = getContent('en')

  it('both locales provide complete content structures', () => {
    expect(contentEs.meta.name).toBe(contentEn.meta.name)
    expect(contentEs.nav.length).toBe(contentEn.nav.length)
    expect(contentEs.projects.length).toBe(contentEn.projects.length)
    expect(contentEs.services.length).toBe(contentEn.services.length)
    expect(contentEs.stack.length).toBe(contentEn.stack.length)
  })

  it('project slugs and indices match exactly across locales and are sequential', () => {
    const esSlugs = contentEs.projects.map((p) => p.slug)
    const enSlugs = contentEn.projects.map((p) => p.slug)
    expect(esSlugs).toEqual(enSlugs)

    contentEs.projects.forEach((proj, idx) => {
      const enProj = contentEn.projects[idx]
      expect(proj.index).toBe(idx + 1)
      expect(enProj?.index).toBe(idx + 1)
      expect(proj.title).toBeTruthy()
      expect(proj.summary).toBeTruthy()
      expect(proj.role).toBeTruthy()
      expect(proj.timeline).toBeTruthy()
      expect(proj.stack.length).toBeGreaterThan(0)
      expect(proj.caseStudy.problem).toBeTruthy()
      expect(proj.caseStudy.approach.length).toBeGreaterThan(0)
      expect(proj.caseStudy.architecture.length).toBeGreaterThan(0)
      expect(proj.caseStudy.outcomes.length).toBeGreaterThan(0)
      if (proj.caseStudy.cover) {
        expect(proj.caseStudy.cover.src).toBeTruthy()
        expect(proj.caseStudy.cover.alt).toBeTruthy()
        expect(enProj?.caseStudy.cover?.src).toBe(proj.caseStudy.cover.src)
      }
    })
  })

  it('service ids match across locales', () => {
    const esIds = contentEs.services.map((s) => s.id)
    const enIds = contentEn.services.map((s) => s.id)
    expect(esIds).toEqual(enIds)
  })

  it('stack group ids match across locales', () => {
    const esIds = contentEs.stack.map((s) => s.id)
    const enIds = contentEn.stack.map((s) => s.id)
    expect(esIds).toEqual(enIds)
  })

  it('nav item ids and hrefs match across locales', () => {
    const esIds = contentEs.nav.map((n) => n.id)
    const enIds = contentEn.nav.map((n) => n.id)
    expect(esIds).toEqual(enIds)

    const esHrefs = contentEs.nav.map((n) => n.href)
    const enHrefs = contentEn.nav.map((n) => n.href)
    expect(esHrefs).toEqual(enHrefs)
  })

  it('validates email addresses in metadata and direct contact links', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    expect(contentEs.meta.email).toMatch(emailRegex)
    expect(contentEn.meta.email).toMatch(emailRegex)

    contentEs.contact.directLinks
      .filter((l) => l.type === 'email')
      .forEach((link) => {
        expect(link.url.replace(/^mailto:/, '')).toMatch(emailRegex)
      })
  })

  it('validates external URLs in metadata and links', () => {
    const urlRegex = /^https?:\/\//
    expect(contentEs.meta.url).toMatch(urlRegex)
    expect(contentEs.meta.socials.github).toMatch(urlRegex)
    expect(contentEs.meta.socials.linkedin).toMatch(urlRegex)
  })
})
