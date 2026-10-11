import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeSwitcher } from '@/features/theme/ThemeSwitcher'
import { LanguageSwitcher } from '@/features/i18n/LanguageSwitcher'
import type { SiteContent } from '@/types/content'

export interface MobileNavProps {
  content: SiteContent
  locale: string
}

/**
 * Accessible mobile navigation sheet with focus trapping, ESC handling,
 * and link-click dismissal.
 */
export function MobileNav({ content, locale }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { nav, ui, meta } = content
  const isHomePage = location.pathname === `/${locale}` || location.pathname === `/${locale}/`
  const contactHref = `/${locale}#contact`

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={ui.menuOpenAria}
          aria-expanded={open}
          className="rounded-control text-muted hover:text-fg hover:bg-surface-hover focus-visible:outline-focus flex items-center justify-center p-2 transition-colors select-none focus-visible:outline-2 xl:hidden"
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        closeLabel={ui.closeMenuAria}
        className="flex w-[85vw] max-w-sm flex-col justify-between"
      >
        <div className="flex flex-col gap-6">
          <SheetHeader className="border-hairline border-b pb-4 text-left">
            <SheetTitle className="text-label-caps text-fg font-mono tracking-wider uppercase">
              {meta.name}
            </SheetTitle>
            <span className="text-label-code text-subtle font-mono">{meta.role}</span>
          </SheetHeader>

          <nav aria-label={ui.headerNavAria} className="flex flex-col gap-2">
            {nav.map((item) => {
              const targetHref = isHomePage ? item.href : `/${locale}${item.href}`

              return (
                <Link
                  key={item.id}
                  to={targetHref}
                  onClick={handleLinkClick}
                  className="rounded-control font-body text-body-md text-fg hover:bg-surface-hover hover:text-accent-fg px-4 py-2.5 transition-colors select-none"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-2">
            <Button asChild variant="primary" size="lg" className="w-full justify-center">
              <a href={contactHref} onClick={handleLinkClick}>
                {ui.hireMe}
              </a>
            </Button>
          </div>
        </div>

        {/* Controls footer inside drawer */}
        <div className="border-hairline flex flex-col gap-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <span className="text-label-code text-subtle font-mono">
              {locale === 'es' ? 'Tema' : 'Theme'}
            </span>
            <ThemeSwitcher ariaLabel={ui.themeSwitcherAria} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-label-code text-subtle font-mono">
              {locale === 'es' ? 'Idioma' : 'Language'}
            </span>
            <LanguageSwitcher ariaLabel={ui.langSwitcherAria} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
