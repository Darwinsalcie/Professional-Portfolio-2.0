import type { Locale } from '@/features/i18n/locale'

export type { Locale }

export type Localized<T> = Record<Locale, T>

export interface SocialLinks {
  github: string
  linkedin: string
  whatsapp: string
}

export interface SiteMeta {
  name: string
  role: string
  url: string
  email: string
  location: string
  timezone: string
  availability: string
  socials: SocialLinks
}

export interface NavItem {
  id: string
  label: string
  href: string
}

export interface HeroContent {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  lede: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export interface StackItem {
  name: string
  tone: 'core' | 'utility'
}

export interface StackGroup {
  id: 'frontend' | 'backend' | 'cloud'
  title: string
  items: StackItem[]
}

export type ServiceIconKey = 'layout' | 'code' | 'server'

export interface ServiceItem {
  id: string
  iconKey: ServiceIconKey
  title: string
  summary: string
  benefits: string[]
}

export interface CaseStudySection {
  problem: string
  approach: string[]
  architecture: string[]
  outcomes: string[]
}

export interface ProjectItem {
  slug: string
  index: number
  domain: string
  title: string
  summary: string
  stack: string[]
  role: string
  timeline: string
  links?: {
    live?: string
    repo?: string
  }
  caseStudy: CaseStudySection
}

export interface AboutPrinciple {
  index: string
  title: string
  description: string
}

export interface AboutContent {
  eyebrow: string
  heading: string
  narrative: string[]
  principles: AboutPrinciple[]
}

export interface ContactDirectLink {
  label: string
  url: string
  type: 'email' | 'github' | 'linkedin' | 'whatsapp'
}

export interface ContactContent {
  eyebrow: string
  heading: string
  lede: string
  formLabels: {
    name: string
    email: string
    message: string
    submit: string
    submitting: string
    successMessage: string
    errorMessage: string
  }
  directLinks: ContactDirectLink[]
}

export interface FooterContent {
  beaconText: string
  statusNotice: string
  rights: string
}

export interface UiLabels {
  themeSwitcherAria: string
  langSwitcherAria: string
  skipLink: string
  notFoundTitle: string
  notFoundLede: string
  returnHome: string
  headerNavAria: string
  hireMe: string
}

export interface SiteContent {
  meta: SiteMeta
  nav: NavItem[]
  hero: HeroContent
  projects: ProjectItem[]
  services: ServiceItem[]
  stack: StackGroup[]
  about: AboutContent
  contact: ContactContent
  footer: FooterContent
  ui: UiLabels
}
