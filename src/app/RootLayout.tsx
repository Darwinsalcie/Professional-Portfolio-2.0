import { Outlet } from 'react-router'
import { SkipLink } from '@/components/SkipLink'
import { useLocale } from '@/features/i18n/useLocale'
import { useContent } from '@/features/i18n/useContent'
import { SiteHeader } from '@/features/layout/SiteHeader'
import { SiteFooter } from '@/features/layout/SiteFooter'

export function RootLayout() {
  const { locale } = useLocale()
  const content = useContent()

  return (
    <div className="bg-bg text-fg-body flex min-h-screen flex-col">
      <SkipLink targetId="main" label={content.ui.skipLink} />

      <SiteHeader content={content} locale={locale} />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <SiteFooter content={content} locale={locale} />
    </div>
  )
}
