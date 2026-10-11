import type { Locale } from '@/features/i18n/locale'
import type { SiteContent } from '@/types/content'
import { aboutContent } from './about'
import { contactContent } from './contact'
import { footerContent } from './footer'
import { heroContent } from './hero'
import { navContent } from './nav'
import { projectsContent } from './projects'
import { servicesContent } from './services'
import { siteContent } from './site'
import { stackContent } from './stack'
import { uiContent } from './ui'

/**
 * Assembles and returns all content modules for the requested locale.
 */
export function getContent(locale: Locale): SiteContent {
  return {
    meta: siteContent[locale],
    nav: navContent[locale],
    hero: heroContent[locale],
    projects: projectsContent[locale],
    services: servicesContent[locale],
    stack: stackContent[locale],
    about: aboutContent[locale],
    contact: contactContent[locale],
    footer: footerContent[locale],
    ui: uiContent[locale],
  }
}

export {
  aboutContent,
  contactContent,
  footerContent,
  heroContent,
  navContent,
  projectsContent,
  servicesContent,
  siteContent,
  stackContent,
  uiContent,
}
