import { Link } from 'react-router'
import { Container } from '@/components/Container'
import { Monogram } from '@/components/Monogram'
import { Button } from '@/components/ui/button'
import { DesktopNav } from './DesktopNav'
import { Avatar } from './Avatar'
import { LanguageSwitcher } from '@/features/i18n/LanguageSwitcher'
import { ThemeSwitcher } from '@/features/theme/ThemeSwitcher'
import type { SiteContent } from '@/types/content'

export interface SiteHeaderProps {
  content: SiteContent
  locale: string
}

/**
 * Sticky translucent desktop site header per code.html and ARCHITECTURE §3.2.
 */
export function SiteHeader({ content, locale }: SiteHeaderProps) {
  const { meta, nav, ui } = content
  const contactHref = `/${locale}#contact`

  return (
    <header className="bg-surface-raised/85 border-hairline sticky top-0 right-0 left-0 z-50 h-20 border-b backdrop-blur-xl transition-colors">
      <Container className="flex h-full items-center justify-between gap-4">
        {/* Brand identity: Monogram + Name/Role */}
        <Link
          to={`/${locale}`}
          className="group focus-visible:outline-focus rounded-control flex shrink-0 items-center gap-3 focus-visible:outline-2"
        >
          <Monogram
            initials={meta.name.slice(0, 2).toUpperCase()}
            size={32}
            className="transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-label-caps text-fg group-hover:text-accent-fg font-mono tracking-wider uppercase transition-colors">
              {meta.name}
            </span>
            <span className="text-label-code text-subtle font-mono">{meta.role}</span>
          </div>
        </Link>

        {/* Section Navigation */}
        <DesktopNav items={nav} locale={locale} ariaLabel={ui.headerNavAria} />

        {/* Right actions: ThemeSwitcher, LanguageSwitcher, Hire Me CTA, Avatar */}
        <div className="flex shrink-0 items-center gap-3">
          <ThemeSwitcher ariaLabel={ui.themeSwitcherAria} />
          <LanguageSwitcher ariaLabel={ui.langSwitcherAria} />

          <Button asChild size="sm" variant="primary" className="hidden sm:inline-flex">
            <a href={contactHref}>{ui.hireMe}</a>
          </Button>

          <Avatar initials={meta.name.slice(0, 2).toUpperCase()} size={32} />
        </div>
      </Container>
    </header>
  )
}
