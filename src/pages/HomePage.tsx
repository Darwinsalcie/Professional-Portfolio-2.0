import { Hero } from '@/features/hero/Hero'
import { useLocale } from '@/features/i18n/useLocale'
import { useContent } from '@/features/i18n/useContent'

export function HomePage() {
  const { locale } = useLocale()
  const content = useContent()

  return (
    <div className="flex flex-col">
      <Hero content={content.hero} locale={locale} />
    </div>
  )
}
