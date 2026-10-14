import type { Localized, ProjectItem } from '@/types/content'

// TODO(content): Replace placeholder projects with owner real client and portfolio projects
export const projectsContent: Localized<ProjectItem[]> = {
  es: [
    {
      slug: 'parkmanager',
      index: 1,
      domain: 'SaaS / Gestión de Estacionamientos & Accesos',
      title: 'ParkManager — Sistema de Gestión Integral',
      summary:
        'Solución integral para administración de aparcamientos con backend monolítico modular en ASP.NET Core, frontend en React, persistencia en PostgreSQL y procesamiento en segundo plano con Hangfire.',
      stack: [
        'React',
        'TypeScript',
        'ASP.NET Core',
        'PostgreSQL',
        'Hangfire',
        'Docker',
        'Tailwind CSS',
      ],
      role: 'Full-Stack Developer & Diseñador de Sistema',
      timeline: '2025 – Presente',
      links: {
        live: 'https://example.com/parkmanager',
        repo: 'https://github.com/example/parkmanager',
      },
      caseStudy: {
        problem:
          'Dificultad para controlar accesos en tiempo real, emitir notificaciones por correo de cobros/estados y ejecutar tareas programadas de forma confiable sin incurrir en la sobrecomplejidad de microservicios.',
        approach: [
          'Adopción de un monolito modular con separación limpia de responsabilidades (Clean Architecture).',
          'Seguridad estricta en endpoints mediante autenticación JWT y control de acceso basado en roles (RBAC).',
          'Automatización de tareas periódicas, conciliaciones y correos transaccionales con Hangfire en segundo plano.',
        ],
        architecture: [
          'Frontend SPA en React + TypeScript con validaciones estrictas y diseño reactivo.',
          'Backend en ASP.NET Core con Entity Framework Core sobre PostgreSQL.',
          'Contenedorización completa con Docker para despliegue reproducible y consistente.',
        ],
        outcomes: [
          'Impacto proyectado en el negocio: reducción del 70% en el tiempo de procesamiento manual de reservas y cobros.',
          'Eliminación de cuellos de botella en la emisión de correos gracias al procesamiento asíncrono con jobs.',
          'Máxima mantenibilidad y bajo costo de infraestructura al priorizar un monolito bien estructurado.',
        ],
        cover: {
          src: '/images/projects/alpha-platform-cover.svg',
          alt: 'Diagrama de arquitectura del sistema ParkManager',
        },
      },
    },
    {
      slug: 'jenkins-devops-platform',
      index: 2,
      domain: 'DevOps / Plataforma de Integración Continua',
      title: 'Infraestructura CI/CD con Jenkins & Docker',
      summary:
        'Entorno de despliegue automatizado basado en Jenkins conteinerizado con Jenkins Configuration as Code (JCasC) y agentes efímeros en Docker para los proyectos del departamento.',
      stack: ['Docker', 'Jenkins', 'JCasC', 'Linux', 'Bash', 'CI/CD Pipelines'],
      role: 'DevOps & Automatización de Infraestructura',
      timeline: '2026',
      links: {
        repo: 'https://github.com/example/jenkins-infra',
      },
      caseStudy: {
        problem:
          'Despliegues manuales propensos a errores humanos, falta de homogeneidad entre entornos de desarrollo y necesidad de centralizar pipelines sin saturar servidores fijos.',
        approach: [
          'Diseño y conteinerización de Jenkins Master y plantillas de agentes efímeros con Docker.',
          'Definición de toda la configuración como código (JCasC) para auditoría y replicabilidad instantánea.',
          'Planificación de la infraestructura centralizada en servidor dedicado para gobernar los despliegues de múltiples proyectos.',
        ],
        architecture: [
          'Maestro Jenkins configurado mediante manifiestos YAML reproducibles (JCasC).',
          'Agentes de compilación efímeros que se instancian en contenedores Docker bajo demanda y se destruyen al finalizar el build.',
          'Aislamiento de credenciales y pipelines declarativos estandarizados.',
        ],
        outcomes: [
          'Impacto estimado en el negocio: 80% de reducción en el tiempo de ciclo desde commit hasta despliegue de pruebas.',
          'Aislamiento total de dependencias entre proyectos sin contaminación en el host del servidor.',
          'Infraestructura lista para escalar la demanda de despliegues departamentales con cero mantenimiento manual.',
        ],
        cover: {
          src: '/images/projects/alpha-platform-cover.svg',
          alt: 'Diagrama de la arquitectura de CI/CD con Jenkins y Docker',
        },
      },
    },
    {
      slug: 'local-business-landing',
      index: 3,
      domain: 'Web / Presencia Digital & Conversión',
      title: 'Landing Page & Plataforma Comercial para Pymes',
      summary:
        'Página de aterrizaje y catálogo comercial de alta conversión concebida para potenciar las ventas locales, optimizada para SEO y con tiempos de carga instantáneos.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'SEO & Analytics'],
      role: 'Desarrollador Web & Estrategia Digital',
      timeline: '2026 (Próximamente)',
      links: {
        live: 'https://example.com/landing-preview',
      },
      caseStudy: {
        problem:
          'Baja captación de clientes digitales en negocios locales debido a sitios lentos, desactualizados o inexistentes en búsquedas móviles.',
        approach: [
          'Arquitectura estática ultra optimizada con foco en Core Web Vitals y puntuación Lighthouse > 95.',
          'Jerarquía visual orientada a la acción con canales directos de contacto (WhatsApp y formularios dinámicos).',
          'Estrategia de posicionamiento SEO local y diseño adaptable a cualquier pantalla.',
        ],
        architecture: [
          'Componentes modulares accesibles con animaciones sutiles y carga asíncrona de recursos.',
          'Estructura de metadatos OpenGraph y schema.org estructurado para indexación en Google.',
        ],
        outcomes: [
          'Impacto proyectado en el negocio: incremento estimado de hasta 40% en solicitudes de presupuestos desde el móvil.',
          'Carga inicial en menos de 1 segundo, maximizando la retención del visitante.',
        ],
      },
    },
  ],
  en: [
    {
      slug: 'parkmanager',
      index: 1,
      domain: 'SaaS / Parking & Access Management',
      title: 'ParkManager — End-to-End Management System',
      summary:
        'Complete solution for parking facility administration featuring a clean monolithic ASP.NET Core backend, reactive React UI, PostgreSQL persistence, and asynchronous background jobs with Hangfire.',
      stack: [
        'React',
        'TypeScript',
        'ASP.NET Core',
        'PostgreSQL',
        'Hangfire',
        'Docker',
        'Tailwind CSS',
      ],
      role: 'Full-Stack Developer & System Designer',
      timeline: '2025 – Present',
      links: {
        live: 'https://example.com/parkmanager',
        repo: 'https://github.com/example/parkmanager',
      },
      caseStudy: {
        problem:
          'Difficulty maintaining reliable real-time access logs, automated billing notifications, and recurring scheduled jobs without introducing unnecessary microservice overhead.',
        approach: [
          'Architected as a clean modular monolith adhering to Clean Architecture principles.',
          'Enforced robust endpoint security with JWT authentication and Role-Based Access Control (RBAC).',
          'Offloaded transactional emails and background processing to reliable Hangfire queues.',
        ],
        architecture: [
          'Modern React + TypeScript SPA with rigorous client validation and accessible styling.',
          'ASP.NET Core API with Entity Framework Core and relational PostgreSQL database.',
          'Full Docker containerization for reliable multi-environment consistency.',
        ],
        outcomes: [
          'Projected business impact: 70% reduction in manual booking and payment reconciliation hours.',
          'Zero interface lag on email dispatches thanks to asynchronous queue isolation.',
          'High maintainability and minimized cloud infrastructure costs by keeping architecture straightforward.',
        ],
        cover: {
          src: '/images/projects/alpha-platform-cover.svg',
          alt: 'ParkManager system architecture diagram',
        },
      },
    },
    {
      slug: 'jenkins-devops-platform',
      index: 2,
      domain: 'DevOps / Continuous Integration Platform',
      title: 'CI/CD Platform with Jenkins & Docker',
      summary:
        'Automated enterprise deployment pipeline utilizing containerized Jenkins with Jenkins Configuration as Code (JCasC) and dynamic ephemeral Docker build agents.',
      stack: ['Docker', 'Jenkins', 'JCasC', 'Linux', 'Bash', 'CI/CD Pipelines'],
      role: 'DevOps & Infrastructure Automation',
      timeline: '2026',
      links: {
        repo: 'https://github.com/example/jenkins-infra',
      },
      caseStudy: {
        problem:
          'Error-prone manual deployment cycles, configuration drift across services, and lack of standardized centralized build pipelines.',
        approach: [
          'Containerized Jenkins Controller paired with on-demand ephemeral Docker agents.',
          'Implemented full Jenkins Configuration as Code (JCasC) for auditability and rapid replication.',
          'Designed dedicated server deployment architecture to govern automated departmental releases.',
        ],
        architecture: [
          'Reproducible declarative YAML configurations via JCasC.',
          'Ephemeral Docker containers spawned dynamically per pipeline execution and torn down immediately upon completion.',
          'Secure credential management and standardized pipeline stages.',
        ],
        outcomes: [
          'Estimated business impact: 80% decrease in commit-to-staging deployment cycle durations.',
          'Clean host isolation preventing cross-project dependency conflicts.',
          'Scalable departmental infrastructure ready for automated multi-branch releases.',
        ],
        cover: {
          src: '/images/projects/alpha-platform-cover.svg',
          alt: 'Jenkins and Docker CI/CD platform diagram',
        },
      },
    },
    {
      slug: 'local-business-landing',
      index: 3,
      domain: 'Web / Digital Presence & Conversion',
      title: 'High-Converting Small Business Landing Page',
      summary:
        'Commercial showcase and lead generation landing page designed to drive local sales with blazing fast load times and optimized local SEO.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'SEO & Analytics'],
      role: 'Web Developer & Digital Strategy',
      timeline: '2026 (Upcoming)',
      links: {
        live: 'https://example.com/landing-preview',
      },
      caseStudy: {
        problem:
          'Low digital customer acquisition for small businesses due to sluggish, unoptimized mobile websites and weak local search visibility.',
        approach: [
          'Ultra-optimized static delivery targeting 95+ Core Web Vitals on Lighthouse.',
          'Action-oriented UX hierarchy with direct conversion paths via WhatsApp and streamlined contact forms.',
          'Structured local SEO metadata for superior Google ranking.',
        ],
        architecture: [
          'Modular React components with fluid typography and zero blocking scripts.',
          'Complete OpenGraph and JSON-LD schema integration for rich search previews.',
        ],
        outcomes: [
          'Projected business impact: estimated 40% increase in inbound customer inquiries from mobile devices.',
          'Sub-second first contentful paint ensuring minimal visitor bounce rates.',
        ],
      },
    },
  ],
}
