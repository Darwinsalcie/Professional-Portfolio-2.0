import { useLocation, useNavigate } from 'react-router'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { LOCALES, swapLocaleInPath, type Locale } from './locale'
import { useLocale } from './useLocale'

export interface LanguageSwitcherProps {
  ariaLabel?: string
}

export function LanguageSwitcher({ ariaLabel = 'Language' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLanguageChange = (nextLocale: string) => {
    const targetLocale = nextLocale as Locale
    setLocale(targetLocale)
    const nextPath = swapLocaleInPath(location.pathname, targetLocale)
    void navigate(`${nextPath}${location.search}${location.hash}`)
  }

  return (
    <RadioGroup value={locale} onValueChange={handleLanguageChange} aria-label={ariaLabel}>
      {LOCALES.map((lang) => (
        <RadioGroupItem key={lang} value={lang}>
          {lang.toUpperCase()}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}
