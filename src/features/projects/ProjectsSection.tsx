import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { ProjectCard } from './ProjectCard'
import type { ProjectItem, UiLabels } from '@/types/content'

export interface ProjectsSectionProps {
  projects: ProjectItem[]
  ui: UiLabels
  locale: string
}

/**
 * Featured projects section (#work) with responsive 3-column / 2-column / 1-column grid.
 */
export function ProjectsSection({ projects, ui, locale }: ProjectsSectionProps) {
  return (
    <Section id="work" ariaLabelledby="work-heading" className="py-12 md:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          titleId="work-heading"
          eyebrow={ui.projectsEyebrow}
          eyebrowTone="tertiary"
          title={ui.projectsTitle}
          description={ui.projectsLede}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              viewCaseStudyLabel={ui.viewCaseStudy}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
