import { Link, useParams } from 'react-router'
import { Container } from '@/components/Container'
import { useLocale } from '@/features/i18n/useLocale'
import { useContent } from '@/features/i18n/useContent'
import { CaseStudyDetail } from '@/features/case-study/CaseStudyDetail'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useLocale()
  const content = useContent()

  const projectIndex = content.projects.findIndex((p) => p.slug === slug)
  const project = projectIndex !== -1 ? content.projects[projectIndex] : undefined

  if (!project) {
    return (
      <Container className="py-24 text-center">
        <p className="text-label-code text-accent-fg font-mono">404 // NOT FOUND</p>
        <h1 tabIndex={-1} className="text-headline-lg text-fg mt-2 font-semibold outline-none">
          {content.ui.notFoundTitle}
        </h1>
        <p className="text-body-md text-muted mt-4">{content.ui.notFoundLede}</p>
        <div className="mt-8">
          <Link
            to={`/${locale}`}
            className="rounded-control bg-accent text-body-sm text-on-accent hover:bg-accent-hover inline-flex px-6 py-2.5 font-mono transition-colors"
          >
            {content.ui.returnHome}
          </Link>
        </div>
      </Container>
    )
  }

  const prevProject = projectIndex > 0 ? content.projects[projectIndex - 1] : undefined
  const nextProject =
    projectIndex < content.projects.length - 1 ? content.projects[projectIndex + 1] : undefined

  return (
    <CaseStudyDetail
      project={project}
      locale={locale}
      ui={content.ui}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  )
}
