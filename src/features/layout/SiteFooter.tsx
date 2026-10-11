import * as React from 'react'
import { Container } from '@/components/Container'
import { StatusBeacon } from '@/components/StatusBeacon'
import { IndexNumber } from '@/components/IndexNumber'
import type { SiteContent } from '@/types/content'

export interface SiteFooterProps {
  content: SiteContent
  locale: string
}

const specifications = [
  'Core: React 19 / .NET 9',
  'Architecture: Clean & Vertical Slice',
  'State: CQRS & Event-Driven',
  'Styling: Tailwind CSS 4 & Strict Tokens',
] as const

/**
 * Site footer matching code.html architectural blueprint:
 * - Status beacon & availability notice
 * - Timezone clock formatted via Intl
 * - Indexed navigation directory (anchors linked with locale prefix for multi-route safety)
 * - Direct contact lines (mailto, WhatsApp, GitHub, LinkedIn)
 * - Architecture specifications
 * - Dynamic year and blueprint metadata
 */
export function SiteFooter({ content, locale }: SiteFooterProps) {
  const { footer, meta, contact, nav } = content
  const currentYear = new Date().getFullYear()

  // Format local time using Intl with owner's configured timezone
  const formattedTime = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat(locale === 'es' ? 'es-CO' : 'en-US', {
        timeZone: meta.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date())
    } catch {
      return '12:00 PM'
    }
  }, [locale, meta.timezone])

  return (
    <footer
      aria-label="Site Footer"
      className="border-hairline bg-surface-sunken/80 text-muted w-full border-t pt-16 pb-12 font-mono"
    >
      <Container className="flex flex-col gap-14">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Status beacon & Bio */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <StatusBeacon status="success" label={footer.beaconText} />
            <p className="font-body text-body-sm text-muted mt-1 max-w-sm">{meta.availability}</p>
            <div className="text-label-code text-subtle mt-2 flex items-center gap-2">
              <span className="font-mono">TIMEZONE:</span>
              <span>
                {meta.timezone} ({formattedTime})
              </span>
            </div>
          </div>

          {/* Col 2: Indexed Directory */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-label-caps text-fg tracking-wider uppercase">Directory</span>
            <ul className="text-body-sm flex flex-col gap-2">
              {nav.map((item, idx) => (
                <li key={item.id} className="flex items-center gap-2.5">
                  <IndexNumber value={idx + 1} />
                  <a
                    href={`/${locale}${item.href}`}
                    className="text-muted hover:text-accent-fg transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Lines */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-label-caps text-fg tracking-wider uppercase">Direct Lines</span>
            <ul className="text-label-code flex flex-col gap-2">
              {contact.directLinks.map((link) => {
                const isExternal = !link.url.startsWith('mailto:')
                return (
                  <li key={link.type}>
                    <a
                      href={link.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="text-muted hover:text-accent-fg transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Col 4: Specifications */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <span className="text-label-caps text-fg tracking-wider uppercase">Specifications</span>
            <div className="text-label-code text-subtle flex flex-col gap-1.5">
              {specifications.map((spec, idx) => (
                <span key={idx}>{spec}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Blueprint Spec */}
        <div className="border-hairline/60 text-label-code text-subtle flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <p>
            © {currentYear} {meta.name}. {footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-fg">v2.0-STABLE</span>
            <span>BLUEPRINT 1440PX SPEC</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
