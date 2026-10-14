import type { Localized, StackGroup } from '@/types/content'

// TODO(content): Review stack ledger technologies and proficiency tones
export const stackContent: Localized<StackGroup[]> = {
  es: [
    {
      id: 'frontend',
      title: 'Frontend & UI',
      items: [
        { name: 'React 19', tone: 'core' },
        { name: 'TypeScript', tone: 'core' },
        { name: 'Tailwind CSS 4', tone: 'core' },
        { name: 'Vite', tone: 'core' },
        { name: 'Radix UI', tone: 'utility' },
        { name: 'Motion', tone: 'utility' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & Datos',
      items: [
        { name: '.NET 9 / C#', tone: 'core' },
        { name: 'ASP.NET Core', tone: 'core' },
        { name: 'Entity Framework Core', tone: 'core' },
        { name: 'PostgreSQL', tone: 'core' },
        { name: 'Hangfire / Background Jobs', tone: 'core' },
        { name: 'SQL Server', tone: 'utility' },
        { name: 'REST APIs & RBAC', tone: 'core' },
      ],
    },
    {
      id: 'cloud',
      title: 'DevOps & Herramientas',
      items: [
        { name: 'Docker & Contenedores', tone: 'core' },
        { name: 'Jenkins (JCasC & Agentes)', tone: 'core' },
        { name: 'SoftExpert', tone: 'core' },
        { name: 'Git & GitHub', tone: 'core' },
        { name: 'CI/CD Pipelines', tone: 'utility' },
        { name: 'Vitest / Testing Library', tone: 'utility' },
      ],
    },
  ],
  en: [
    {
      id: 'frontend',
      title: 'Frontend & UI',
      items: [
        { name: 'React 19', tone: 'core' },
        { name: 'TypeScript', tone: 'core' },
        { name: 'Tailwind CSS 4', tone: 'core' },
        { name: 'Vite', tone: 'core' },
        { name: 'Radix UI', tone: 'utility' },
        { name: 'Motion', tone: 'utility' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & Data',
      items: [
        { name: '.NET 9 / C#', tone: 'core' },
        { name: 'ASP.NET Core', tone: 'core' },
        { name: 'Entity Framework Core', tone: 'core' },
        { name: 'PostgreSQL', tone: 'core' },
        { name: 'Hangfire / Background Jobs', tone: 'core' },
        { name: 'SQL Server', tone: 'utility' },
        { name: 'REST APIs & RBAC', tone: 'core' },
      ],
    },
    {
      id: 'cloud',
      title: 'DevOps & Tooling',
      items: [
        { name: 'Docker & Containers', tone: 'core' },
        { name: 'Jenkins (JCasC & Agents)', tone: 'core' },
        { name: 'SoftExpert', tone: 'core' },
        { name: 'Git & GitHub', tone: 'core' },
        { name: 'CI/CD Pipelines', tone: 'utility' },
        { name: 'Vitest / Testing Library', tone: 'utility' },
      ],
    },
  ],
}
