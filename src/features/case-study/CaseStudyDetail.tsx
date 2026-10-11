import type { ProjectItem, UiLabels } from '@/types/content'
import type { Locale } from '@/features/i18n/locale'
import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch } from 'lucide-react'
import { Container } from '@/components/Container'
import { Chip } from '@/components/Chip'
import { Card } from '@/components/Card'

export interface CaseStudyDetailProps {
  project: ProjectItem
  locale: Locale
  ui: UiLabels
  prevProject?: ProjectItem
  nextProject?: ProjectItem
}

/**
 * Full presentation component for an individual project case study.
 * Follows the visual tokens: xl 8/4 desktop split, indexed ordered lists,
 * metadata sidebar, optional cover, and prev/next pager.
 */
export function CaseStudyDetail({
  project,
  locale,
  ui,
  prevProject,
  nextProject,
}: CaseStudyDetailProps) {
  const indexStr = String(project.index).padStart(2, '0')

  return (
    <article className="py-12 md:py-16">
      <Container>
        {/* Navigation Breadcrumb / Back Link */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            to={`/${locale}#work`}
            className="text-label-code text-muted hover:text-accent-fg inline-flex items-center gap-2 font-mono transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{ui.caseStudyBack}</span>
          </Link>
        </nav>

        {/* Header Block */}
        <header className="border-hairline mb-12 border-b pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-label-code text-accent-fg font-mono tracking-wider">
              {indexStr} // CASE STUDY
            </span>
            <Chip variant="active">{project.domain}</Chip>
          </div>
          <h1
            tabIndex={-1}
            className="text-headline-lg md:text-display text-fg mt-4 font-semibold tracking-tight outline-none"
          >
            {project.title}
          </h1>
          <p className="text-body-lg text-muted mt-4 max-w-3xl leading-relaxed">
            {project.summary}
          </p>
        </header>

        {/* Main Content Layout: 8 cols main, 4 cols sidebar on desktop */}
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-12">
          {/* Main Case Study Flow (xl:col-span-8) */}
          <section className="space-y-12 xl:col-span-8" aria-label="Case Study Content">
            {/* Optional Cover */}
            {project.caseStudy.cover ? (
              <div className="rounded-card border-hairline bg-surface-subtle overflow-hidden border p-2">
                <div className="rounded-control bg-surface flex min-h-64 items-center justify-center p-8 text-center">
                  <div className="space-y-2">
                    <p className="text-label-code text-accent-fg font-mono uppercase">
                      Architecture Blueprint
                    </p>
                    <p className="text-body-sm text-subtle font-mono">
                      {project.caseStudy.cover.alt}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Problem Section */}
            <div className="space-y-4">
              <h2 className="text-headline-sm text-fg flex items-center gap-3 font-semibold">
                <span className="text-label-code text-accent-fg font-mono">01 //</span>
                <span>{ui.caseStudyProblemHeading}</span>
              </h2>
              <div className="rounded-card border-hairline bg-surface shadow-card p-6">
                <p className="text-body-md text-muted leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </div>
            </div>

            {/* Approach Section */}
            <div className="space-y-4">
              <h2 className="text-headline-sm text-fg flex items-center gap-3 font-semibold">
                <span className="text-label-code text-accent-fg font-mono">02 //</span>
                <span>{ui.caseStudyApproachHeading}</span>
              </h2>
              <ol className="space-y-3">
                {project.caseStudy.approach.map((item, idx) => {
                  const stepIndex = String(idx + 1).padStart(2, '0')
                  return (
                    <li
                      key={stepIndex}
                      className="rounded-card border-hairline bg-surface shadow-card flex items-start gap-4 p-5"
                    >
                      <span className="text-label-code text-accent-fg shrink-0 pt-0.5 font-mono">
                        {stepIndex}
                      </span>
                      <p className="text-body-md text-muted leading-relaxed">{item}</p>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Architecture Section */}
            <div className="space-y-4">
              <h2 className="text-headline-sm text-fg flex items-center gap-3 font-semibold">
                <span className="text-label-code text-accent-fg font-mono">03 //</span>
                <span>{ui.caseStudyArchitectureHeading}</span>
              </h2>
              <ul className="space-y-3">
                {project.caseStudy.architecture.map((item, idx) => {
                  const archIndex = String(idx + 1).padStart(2, '0')
                  return (
                    <li
                      key={archIndex}
                      className="rounded-card border-hairline bg-surface shadow-card flex items-start gap-4 p-5"
                    >
                      <span className="text-label-code text-muted shrink-0 pt-0.5 font-mono">
                        # {archIndex}
                      </span>
                      <p className="text-body-md text-muted leading-relaxed">{item}</p>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Outcomes Section */}
            <div className="space-y-4">
              <h2 className="text-headline-sm text-fg flex items-center gap-3 font-semibold">
                <span className="text-label-code text-accent-fg font-mono">04 //</span>
                <span>{ui.caseStudyOutcomesHeading}</span>
              </h2>
              <ul className="space-y-3">
                {project.caseStudy.outcomes.map((item, idx) => {
                  const outIndex = String(idx + 1).padStart(2, '0')
                  return (
                    <li
                      key={outIndex}
                      className="rounded-card border-hairline bg-surface shadow-card flex items-start gap-4 p-5"
                    >
                      <span className="text-label-code text-accent-fg shrink-0 pt-0.5 font-mono">
                        ✓
                      </span>
                      <p className="text-body-md text-fg-body leading-relaxed">{item}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* Meta Sidebar (xl:col-span-4) */}
          <aside className="space-y-6 xl:col-span-4" aria-label="Project Metadata">
            <Card className="p-6">
              <h3 className="text-label-caps text-accent-fg mb-4 font-mono uppercase">
                {ui.caseStudyRole}
              </h3>
              <p className="text-body-md text-fg font-medium">{project.role}</p>

              <hr className="border-hairline my-6" />

              <h3 className="text-label-caps text-accent-fg mb-4 font-mono uppercase">
                {ui.caseStudyTimeline}
              </h3>
              <p className="text-body-md text-fg font-mono">{project.timeline}</p>

              <hr className="border-hairline my-6" />

              <h3 className="text-label-caps text-accent-fg mb-4 font-mono uppercase">
                {ui.caseStudyStack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Chip key={tech} variant="default">
                    {tech}
                  </Chip>
                ))}
              </div>

              {project.links?.live || project.links?.repo ? (
                <>
                  <hr className="border-hairline my-6" />
                  <h3 className="text-label-caps text-accent-fg mb-4 font-mono uppercase">
                    {ui.caseStudyLinks}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm text-accent-fg hover:text-accent-hover inline-flex items-center gap-2 font-mono transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        <span>{ui.caseStudyLiveLink}</span>
                      </a>
                    ) : null}
                    {project.links.repo ? (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm text-muted hover:text-fg inline-flex items-center gap-2 font-mono transition-colors"
                      >
                        <GitBranch className="h-4 w-4" aria-hidden="true" />
                        <span>{ui.caseStudyRepoLink}</span>
                      </a>
                    ) : null}
                  </div>
                </>
              ) : null}
            </Card>
          </aside>
        </div>

        {/* Prev / Next Pager */}
        <footer className="border-hairline mt-16 border-t pt-8">
          <nav
            aria-label="Projects Pager"
            className="flex flex-col justify-between gap-4 sm:flex-row"
          >
            {prevProject ? (
              <Link
                to={`/${locale}/work/${prevProject.slug}`}
                className="group rounded-control border-hairline hover:border-hairline-strong bg-surface hover:bg-surface-hover flex flex-1 items-center gap-4 border p-4 transition-all hover:-translate-x-1"
              >
                <ArrowLeft className="text-muted group-hover:text-accent-fg h-5 w-5 shrink-0 transition-colors" />
                <div className="min-w-0">
                  <span className="text-label-caps text-subtle block font-mono uppercase">
                    {ui.caseStudyPrev}
                  </span>
                  <span className="text-body-md text-fg group-hover:text-accent-fg block truncate font-medium transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextProject ? (
              <Link
                to={`/${locale}/work/${nextProject.slug}`}
                className="group rounded-control border-hairline hover:border-hairline-strong bg-surface hover:bg-surface-hover flex flex-1 items-center justify-end gap-4 border p-4 text-right transition-all hover:translate-x-1"
              >
                <div className="min-w-0">
                  <span className="text-label-caps text-subtle block font-mono uppercase">
                    {ui.caseStudyNext}
                  </span>
                  <span className="text-body-md text-fg group-hover:text-accent-fg block truncate font-medium transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="text-muted group-hover:text-accent-fg h-5 w-5 shrink-0 transition-colors" />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        </footer>
      </Container>
    </article>
  )
}
