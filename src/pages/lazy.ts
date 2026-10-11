import { lazy } from 'react'

export const LazyHomePage = lazy(async () => {
  const mod = await import('./HomePage')
  return { default: mod.HomePage }
})

export const LazyCaseStudyPage = lazy(async () => {
  const mod = await import('./CaseStudyPage')
  return { default: mod.CaseStudyPage }
})

export const LazyNotFoundPage = lazy(async () => {
  const mod = await import('./NotFoundPage')
  return { default: mod.NotFoundPage }
})
