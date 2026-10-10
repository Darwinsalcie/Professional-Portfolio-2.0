import { Outlet, Link } from 'react-router'
import { Container } from '@/components/Container'
import { SkipLink } from '@/components/SkipLink'
import { LanguageSwitcher } from '@/features/i18n/LanguageSwitcher'
import { useLocale } from '@/features/i18n/useLocale'
import { ThemeSwitcher } from '@/features/theme/ThemeSwitcher'

export function RootLayout() {
  const { locale } = useLocale()

  return (
    <div className="bg-bg text-fg-body flex min-h-screen flex-col">
      <SkipLink
        targetId="main"
        label={locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      />

      <header className="border-hairline bg-surface-raised/85 sticky top-0 z-40 border-b backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link
            to={`/${locale}`}
            className="text-label-code text-fg hover:text-accent-fg flex items-center gap-2 font-mono transition-colors"
          >
            <span className="rounded-nav bg-accent text-on-accent flex h-7 w-7 items-center justify-center font-semibold">
              P
            </span>
            <span className="font-semibold tracking-wider">PORTFOLIO // 2.0</span>
          </Link>

          <nav
            aria-label={locale === 'es' ? 'Preferencias' : 'Preferences'}
            className="flex items-center gap-2"
          >
            <LanguageSwitcher ariaLabel={locale === 'es' ? 'Idioma' : 'Language'} />
            <ThemeSwitcher ariaLabel={locale === 'es' ? 'Tema' : 'Theme'} />
          </nav>
        </Container>
      </header>

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <footer className="border-hairline bg-surface-sunken text-body-sm text-subtle border-t py-8 text-center font-mono">
        <Container>
          <p>© {new Date().getFullYear()} Professional Portfolio 2.0</p>
        </Container>
      </footer>
    </div>
  )
}
