import { Link, useLocation } from 'react-router'
import { useActiveSection } from './useActiveSection'
import { cn } from '@/lib/cn'
import type { NavItem } from '@/types/content'

export interface DesktopNavProps {
  items: NavItem[]
  locale: string
  ariaLabel: string
}

/**
 * Desktop navigation menu with section anchor links and active indicator.
 */
export function DesktopNav({ items, locale, ariaLabel }: DesktopNavProps) {
  const location = useLocation()
  const isHomePage = location.pathname === `/${locale}` || location.pathname === `/${locale}/`
  const sectionIds = items.map((item) => item.id)
  const activeSection = useActiveSection(sectionIds)

  return (
    <nav aria-label={ariaLabel} className="hidden items-center gap-1.5 xl:flex">
      {items.map((item) => {
        const isCurrent = isHomePage && activeSection === item.id
        const targetHref = isHomePage ? item.href : `/${locale}${item.href}`

        return (
          <Link
            key={item.id}
            to={targetHref}
            aria-current={isCurrent ? 'location' : undefined}
            className={cn(
              'font-body text-body-sm rounded-nav px-3 py-1.5 transition-colors select-none',
              isCurrent
                ? 'bg-accent text-on-accent font-semibold'
                : 'text-muted hover:text-fg hover:bg-surface-hover',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
