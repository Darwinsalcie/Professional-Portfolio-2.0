import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { ServiceCard } from './ServiceCard'
import type { ServiceItem, UiLabels } from '@/types/content'

export interface ServicesSectionProps {
  services: ServiceItem[]
  ui: UiLabels
  locale: string
}

/**
 * Services / Specialized Consulting section (#services).
 */
export function ServicesSection({ services, ui, locale }: ServicesSectionProps) {
  return (
    <Section id="services" ariaLabelledby="services-heading" className="py-12 md:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          titleId="services-heading"
          eyebrow={ui.servicesEyebrow}
          eyebrowTone="secondary"
          title={ui.servicesTitle}
          description={ui.servicesLede}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale}
              consultLabel={ui.consultCta}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
