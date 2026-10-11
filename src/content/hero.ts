import type { HeroContent, Localized } from '@/types/content'

// TODO(content): Verify hero copy and headline statements
export const heroContent: Localized<HeroContent> = {
  es: {
    // TODO(content): Hero eyebrow text
    eyebrow: 'Ingeniería de Software & Arquitectura Web',
    titleLine1: 'Desarrollador Full-Stack',
    titleLine2: 'React & .NET Moderno',
    // TODO(content): Hero narrative lede
    lede: 'Construyo aplicaciones web confiables y sitios de alto impacto con React, TypeScript y arquitecturas limpias en .NET.',
    primaryCta: {
      label: 'Ver proyectos',
      href: '#work',
    },
    secondaryCta: {
      label: 'Iniciar conversación',
      href: '#contact',
    },
  },
  en: {
    // TODO(content): Hero eyebrow text
    eyebrow: 'Software Engineering & Web Architecture',
    titleLine1: 'Full-Stack Developer',
    titleLine2: 'Modern React & .NET',
    // TODO(content): Hero narrative lede
    lede: 'Building reliable web applications and high-impact digital experiences with React, TypeScript, and clean .NET backends.',
    primaryCta: {
      label: 'Explore work',
      href: '#work',
    },
    secondaryCta: {
      label: 'Get in touch',
      href: '#contact',
    },
  },
}
