import type { Localized, ProjectItem } from '@/types/content'

// TODO(content): Replace placeholder projects with owner real client and portfolio projects
export const projectsContent: Localized<ProjectItem[]> = {
  es: [
    {
      slug: 'alpha-platform',
      index: 1,
      domain: 'SaaS / Gestión en Tiempo Real',
      title: 'Plataforma de Operaciones Distribuidas',
      summary:
        'Arquitectura de procesamiento modular con interfaz reactiva en React y backend escalable en .NET Core.',
      stack: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Tailwind CSS'],
      role: 'Arquitectura Frontend & Backend',
      timeline: '2025',
      links: {
        live: 'https://example.com/project-alpha',
        repo: 'https://github.com/example/project-alpha',
      },
      caseStudy: {
        problem:
          'Procesos manuales y latencia alta en flujos de sincronización de datos entre sucursales.',
        approach: [
          'Modelado de dominio centrado en CQRS y eventos de dominio.',
          'Diseño de UI componentizada con contratos de datos estrictos en TypeScript.',
        ],
        architecture: [
          'Single Page Application optimizada con React y Tailwind.',
          'Servicios RESTful en ASP.NET Core con autenticación JWT.',
        ],
        outcomes: [
          'Reducción en tiempos de carga y respuesta de interfaz.',
          'Flujo de trabajo unificado para operaciones diarias.',
        ],
        cover: {
          src: '/images/projects/alpha-platform-cover.svg',
          alt: 'Diagrama de arquitectura del sistema distribuido Alpha',
        },
      },
    },
    {
      slug: 'enterprise-portal',
      index: 2,
      domain: 'Fintech / Panel Empresarial',
      title: 'Portal de Análisis y Liquidaciones',
      summary:
        'Dashboard analítico con visualización interactiva de métricas y exportación automatizada de reportes contables.',
      stack: ['React', 'TypeScript', 'C#', 'SQL Server', 'Tailwind CSS'],
      role: 'Desarrollador Full-Stack Principal',
      timeline: '2024',
      links: {
        live: 'https://example.com/project-beta',
      },
      caseStudy: {
        problem: 'Consolidación lenta de registros transaccionales para auditores financieros.',
        approach: [
          'Implementación de vistas tabulares virtualizadas con accesibilidad completa.',
          'Endpoints optimizados con cache distribuido.',
        ],
        architecture: [
          'Arquitectura en capas con Entity Framework Core.',
          'Diseño responsive adaptado a pantallas de alta resolución.',
        ],
        outcomes: [
          'Automatización del ciclo de conciliación de registros.',
          'Cero incidentes de accesibilidad reportados.',
        ],
      },
    },
  ],
  en: [
    {
      slug: 'alpha-platform',
      index: 1,
      domain: 'SaaS / Real-Time Operations',
      title: 'Distributed Operations Platform',
      summary:
        'Modular data processing architecture featuring a reactive React UI and a scalable .NET Core backend.',
      stack: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Tailwind CSS'],
      role: 'Frontend & Backend Architecture',
      timeline: '2025',
      links: {
        live: 'https://example.com/project-alpha',
        repo: 'https://github.com/example/project-alpha',
      },
      caseStudy: {
        problem:
          'Manual workflows and high latency in cross-branch operational data synchronization.',
        approach: [
          'Domain modeling focused on CQRS patterns and clean domain events.',
          'Component-driven UI built on strict TypeScript contracts.',
        ],
        architecture: [
          'Optimized Single Page Application with React and Tailwind.',
          'RESTful services in ASP.NET Core with JWT authentication.',
        ],
        outcomes: [
          'Significant speedup in UI responsiveness and data throughput.',
          'Unified workflow across daily operational activities.',
        ],
        cover: {
          src: '/images/projects/alpha-platform-cover.svg',
          alt: 'Architecture diagram of the Alpha distributed operations platform',
        },
      },
    },
    {
      slug: 'enterprise-portal',
      index: 2,
      domain: 'Fintech / Enterprise Dashboard',
      title: 'Settlement & Analytics Portal',
      summary:
        'Interactive financial dashboard with dynamic data visualizations and automated accounting reporting exports.',
      stack: ['React', 'TypeScript', 'C#', 'SQL Server', 'Tailwind CSS'],
      role: 'Lead Full-Stack Developer',
      timeline: '2024',
      links: {
        live: 'https://example.com/project-beta',
      },
      caseStudy: {
        problem: 'Slow transactional reconciliation for internal financial auditing teams.',
        approach: [
          'Virtualized data tables with comprehensive keyboard and screen reader support.',
          'Optimized backend queries with structured caching.',
        ],
        architecture: [
          'Clean layered architecture with Entity Framework Core.',
          'Responsive design engineered for high-density workstations.',
        ],
        outcomes: [
          'End-to-end automation of daily reconciliation cycles.',
          'Full accessibility compliance across all financial workflows.',
        ],
      },
    },
  ],
}
