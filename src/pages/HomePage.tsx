import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { useLocale } from '@/features/i18n/useLocale'

export function HomePage() {
  const { locale } = useLocale()

  return (
    <Container className="py-12">
      <Section id="work" ariaLabelledby="work-heading">
        <h1 id="work-heading" className="text-headline-xl text-fg font-semibold">
          {locale === 'es' ? 'Desarrollador Full-Stack' : 'Full-Stack Developer'}
        </h1>
        <p className="text-body-lg text-muted mt-4 max-w-2xl">
          {locale === 'es'
            ? 'Arquitecturas limpias y aplicaciones web modernas construidas con React y .NET.'
            : 'Clean architectures and modern web applications built with React and .NET.'}
        </p>
      </Section>
    </Container>
  )
}
