import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/Card'
import { Chip } from '@/components/Chip'
import { IndexNumber } from '@/components/IndexNumber'
import type { ProjectItem } from '@/types/content'

export interface ProjectCardProps {
  project: ProjectItem
  locale: string
  viewCaseStudyLabel: string
}

/**
 * Featured project showcase card linking to /work/:slug.
 * Translucent glass styling per code.html and ARCHITECTURE §3.2.
 */
export function ProjectCard({ project, locale, viewCaseStudyLabel }: ProjectCardProps) {
  const caseStudyHref = `/${locale}/work/${project.slug}`

  return (
    <Card as="article" variant="card" className="group flex flex-col justify-between p-6 sm:p-8">
      <div className="flex flex-col gap-4">
        {/* Header line: Domain category + Index */}
        <div className="flex items-center justify-between">
          <span className="text-label-code text-eyebrow-tertiary font-mono">{project.domain}</span>
          <IndexNumber value={project.index} />
        </div>

        {/* Title */}
        <h3 className="font-display text-headline-sm text-fg group-hover:text-accent-fg transition-colors">
          <Link
            to={caseStudyHref}
            className="focus-visible:outline-focus rounded-control focus-visible:outline-2"
          >
            {project.title}
          </Link>
        </h3>

        {/* Summary lede */}
        <p className="font-body text-body-md text-muted line-clamp-3">{project.summary}</p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>

      {/* Footer link to Case Study */}
      <div className="border-hairline mt-8 flex items-center justify-between border-t pt-5">
        <Link
          to={caseStudyHref}
          className="text-label-code text-accent-fg focus-visible:outline-focus rounded-control flex items-center gap-1.5 font-mono font-semibold hover:underline focus-visible:outline-2"
        >
          <span>{viewCaseStudyLabel}</span>
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <span className="text-label-code text-subtle font-mono">{project.timeline}</span>
      </div>
    </Card>
  )
}
