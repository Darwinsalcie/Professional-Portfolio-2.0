import { Layout, CodeXml, Server } from 'lucide-react'
import { Card } from '@/components/Card'
import { Button } from '@/components/ui/button'
import type { ServiceIconKey, ServiceItem } from '@/types/content'

export interface ServiceCardProps {
  service: ServiceItem
  locale: string
  consultLabel: string
}

const iconMap: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  layout: Layout,
  code: CodeXml,
  server: Server,
}

/**
 * Service capability card with typed Lucide icon, benefits list, and CTA to contact.
 */
export function ServiceCard({ service, locale, consultLabel }: ServiceCardProps) {
  const Icon = iconMap[service.iconKey]
  const contactHref = `/${locale}#contact`

  return (
    <Card as="article" variant="card" className="group flex flex-col justify-between p-6 sm:p-8">
      <div className="flex flex-col gap-6">
        {/* Icon container styled in tone matching code.html */}
        <div className="rounded-control bg-accent/15 text-accent-fg ring-hairline-strong group-hover:bg-accent/25 flex size-12 items-center justify-center ring-1 transition-colors">
          <Icon className="size-6" />
        </div>

        {/* Title and summary */}
        <div className="flex flex-col gap-2.5">
          <h3 className="font-display text-headline-sm text-fg group-hover:text-accent-fg transition-colors">
            {service.title}
          </h3>
          <p className="font-body text-body-md text-muted">{service.summary}</p>
        </div>

        {/* Bulleted benefit list */}
        <ul className="border-hairline/60 flex flex-col gap-2 border-t pt-2">
          {service.benefits.map((benefit, idx) => (
            <li key={idx} className="font-body text-body-sm text-muted flex items-start gap-2.5">
              <span
                className="bg-accent-fg mt-1.5 size-1.5 shrink-0 rounded-full"
                aria-hidden="true"
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button linking to #contact */}
      <div className="mt-8 pt-4">
        <Button asChild variant="ghost" size="sm" className="w-full justify-center">
          <a href={contactHref}>{consultLabel}</a>
        </Button>
      </div>
    </Card>
  )
}
