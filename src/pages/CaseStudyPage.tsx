import { Link, useParams } from 'react-router'
import { Container } from '@/components/Container'
import { useLocale } from '@/features/i18n/useLocale'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useLocale()

  return (
    <Container className="py-12">
      <nav className="text-body-sm text-subtle mb-6 font-mono">
        <Link to={`/${locale}`} className="hover:text-fg transition-colors">
          ← {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </nav>
      <h1 className="text-headline-lg text-fg font-semibold">
        {locale === 'es' ? `Estudio de Caso: ${slug ?? ''}` : `Case Study: ${slug ?? ''}`}
      </h1>
      <p className="text-body-md text-muted mt-4">
        {locale === 'es'
          ? 'Detalles técnicos y resultados del proyecto.'
          : 'Technical architecture and project outcomes.'}
      </p>
    </Container>
  )
}
