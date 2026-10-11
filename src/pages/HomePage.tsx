import { Hero } from '@/features/hero/Hero'
import { ProjectsSection } from '@/features/projects/ProjectsSection'
import { ServicesSection } from '@/features/services/ServicesSection'
import { useLocale } from '@/features/i18n/useLocale'
import { useContent } from '@/features/i18n/useContent'

export function HomePage() {
  const { locale } = useLocale()
  const content = useContent()

  return (
    <div className="flex flex-col">
      <Hero content={content.hero} locale={locale} />
      <ProjectsSection projects={content.projects} ui={content.ui} locale={locale} />
      <ServicesSection services={content.services} ui={content.ui} locale={locale} />
    </div>
  )
}
