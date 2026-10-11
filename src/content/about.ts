import type { AboutContent, Localized } from '@/types/content'

// TODO(content): Verify narrative text and engineering principles with owner bio
export const aboutContent: Localized<AboutContent> = {
  es: {
    // TODO(content): About section eyebrow
    eyebrow: 'Trayectoria & Filosofía de Trabajo',
    heading: 'Diseñando software robusto desde la base hasta la interfaz.',
    narrative: [
      // TODO(content): Owner bio narrative paragraph 1
      'Me especializo en el desarrollo full-stack con un enfoque artesanal en la calidad del código, el rendimiento y la experiencia de usuario.',
      // TODO(content): Owner bio narrative paragraph 2
      'Combino el dinamismo del ecosistema React en el cliente con la solidez y tipado estricto de .NET en el servidor para crear soluciones que perduran.',
    ],
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
      // TODO(content): Owner bio narrative paragraph 1
      'I specialize in full-stack engineering with an artisan focus on code quality, runtime reliability, and exceptional user experience.',
      // TODO(content): Owner bio narrative paragraph 2
      'Combining the rapid responsiveness of the React ecosystem with the robust, strongly-typed foundation of .NET on the server to build software that scales.',
    ],
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
