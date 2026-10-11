import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { THEME_CHOICES, type ThemeChoice } from './theme-constants'
import { useTheme } from './useTheme'

export interface ThemeSwitcherProps {
  ariaLabel?: string
  labels?: Record<ThemeChoice, string>
}

const DEFAULT_LABELS: Record<ThemeChoice, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

export function ThemeSwitcher({
  ariaLabel = 'Select theme',
  labels = DEFAULT_LABELS,
}: ThemeSwitcherProps) {
  const { choice, setChoice } = useTheme()

  return (
    <RadioGroup
      value={choice}
      onValueChange={(val) => {
        setChoice(val as ThemeChoice)
      }}
      aria-label={ariaLabel}
    >
      {THEME_CHOICES.map((themeOption) => (
        <RadioGroupItem key={themeOption} value={themeOption}>
          {labels[themeOption]}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}
