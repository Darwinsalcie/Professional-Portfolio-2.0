import type { Localized, ServiceItem } from '@/types/content'

// TODO(content): Verify services offering and business capabilities
export const servicesContent: Localized<ServiceItem[]> = {
  es: [
    {
      id: 'landing-pages',
      iconKey: 'layout',
      title: 'Landing Pages & Sitios de Conversión',
      summary:
        'Páginas web de alto impacto diseñadas para convertir visitantes en clientes con carga ultra rápida y diseño responsivo.',
      benefits: [
        'Puntuación Lighthouse superior a 95 en rendimiento y accesibilidad',
        'Diseño moderno, tipografía cuidada y estética prémium',
        'Optimización técnica de SEO para posicionamiento en motores de búsqueda',
      ],
    },
    {
      id: 'web-apps',
      iconKey: 'code',
      title: 'Aplicaciones Web a Medida',
      summary:
        'Sistemas web dinámicos, dashboards y paneles de control robustos desarrollados en React con TypeScript estricto.',
      benefits: [
        'Interfaces interactivas con estados predecibles y sin errores de runtime',
        'Integración fluida con APIs REST y servicios en la nube',
        'Diseño accesible (WCAG AA) para todos los usuarios',
      ],
    },
    {
      id: 'backend-architecture',
      iconKey: 'server',
      title: 'Backends y APIs en .NET',
      summary:
        'Servicios escalables y seguros en ASP.NET Core con bases de datos relacionales y arquitectura mantenible.',
      benefits: [
        'Arquitectura limpia y modular con pruebas automatizadas',
        'Autenticación segura, autorización y manejo de permisos',
        'Modelado de datos eficiente y optimización de consultas SQL',
      ],
    },
  ],
  en: [
    {
      id: 'landing-pages',
      iconKey: 'layout',
      title: 'High-Converting Landing Pages',
      summary:
        'Impactful web pages engineered to turn visitors into customers with blazing load speeds and sleek responsive aesthetics.',
      benefits: [
        'Lighthouse performance and accessibility scores above 95',
        'Modern aesthetics with refined typography and responsive layout',
        'Technical search engine optimization built into every page',
      ],
    },
    {
      id: 'web-apps',
      iconKey: 'code',
      title: 'Custom Web Applications',
      summary:
        'Dynamic web systems, dashboards, and client portals built with React and strict, rock-solid TypeScript.',
      benefits: [
        'Interactive interfaces with predictable state and zero runtime regressions',
        'Seamless integration with REST APIs and cloud services',
        'Accessible design meeting WCAG AA standards out of the box',
      ],
    },
    {
      id: 'backend-architecture',
      iconKey: 'server',
      title: 'Robust .NET Backends & APIs',
      summary:
        'Scalable, secure backend architectures built with ASP.NET Core, relational databases, and clean code principles.',
      benefits: [
        'Clean, modular domain architecture with comprehensive automated tests',
        'Secure authentication, authorization, and role management',
        'Optimized data access and SQL query performance tuning',
      ],
    },
  ],
}
