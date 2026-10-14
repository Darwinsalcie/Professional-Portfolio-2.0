import type { AboutContent, Localized } from '@/types/content'

// TODO(content): Verify narrative text and engineering principles with owner bio
export const aboutContent: Localized<AboutContent> = {
  es: {
    // TODO(content): About section eyebrow
    eyebrow: 'Trayectoria & Filosofía de Trabajo',
    heading: 'Diseñando software robusto desde la base hasta la interfaz.',
    narrative: [
      'Me especializo en el desarrollo de software full-stack con un enfoque riguroso en la arquitectura limpia, la confiabilidad de los datos y una experiencia de usuario ágil.',
      'Combino el dinamismo del frontend moderno en React con la solidez, tipado estricto y alto desempeño del ecosistema .NET y bases de datos relacionales para construir soluciones empresariales listas para producción.',
    ],
    experienceNotice: {
      role: 'Desarrollador de Software',
      organization: 'MITUR',
      period: 'Desde 2024 (Actualidad)',
    },
    educationNotice: {
      status: 'Ingeniería de Software',
      progress: 'Fase final de carrera (80%)',
    },
    resumeCta: {
      label: 'Descargar Curriculum Vitae',
      href: '/cv.pdf',
    },
    principles: [
      {
        index: '01',
        title: 'Calidad sin concesiones',
        description:
          'Tipado estricto, pruebas automatizadas y estándares de accesibilidad como parte del flujo diario.',
      },
      {
        index: '02',
        title: 'Rendimiento tangible',
        description:
          'Carga instantánea, sin bloqueos en el hilo principal y empaquetado optimizado.',
      },
      {
        index: '03',
        title: 'Simplicidad arquitectónica',
        description:
          'Construir lo necesario con claridad conceptual antes de agregar capas de abstracción innecesarias.',
      },
    ],
  },
  en: {
    // TODO(content): About section eyebrow
    eyebrow: 'Background & Engineering Philosophy',
    heading: 'Engineering resilient software from domain logic to the user interface.',
    narrative: [
      'I specialize in full-stack software development with a rigorous focus on clean architecture, runtime reliability, and responsive user experiences.',
      'Combining the rapid interactivity of modern React with the robust, strongly-typed foundation of .NET and relational data engines to deliver institutional-grade solutions.',
    ],
    experienceNotice: {
      role: 'Software Developer',
      organization: 'MITUR',
      period: 'Since 2024 (Present)',
    },
    educationNotice: {
      status: 'Software Engineering',
      progress: 'Senior student (~80% completed)',
    },
    resumeCta: {
      label: 'Download Curriculum Vitae',
      href: '/cv.pdf',
    },
    principles: [
      {
        index: '01',
        title: 'Uncompromising Quality',
        description:
          'Strict typing, automated testing, and accessibility standards treated as non-negotiable defaults.',
      },
      {
        index: '02',
        title: 'Tangible Performance',
        description:
          'Sub-second load times, minimal main thread overhead, and optimized production bundles.',
      },
      {
        index: '03',
        title: 'Architectural Clarity',
        description:
          'Building purposeful software with straightforward mental models rather than premature abstractions.',
      },
    ],
  },
}
