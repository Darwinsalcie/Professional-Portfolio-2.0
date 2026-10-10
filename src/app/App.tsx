import { ThemeProvider } from '@/features/theme/ThemeProvider'
import { ThemeSwitcher } from '@/features/theme/ThemeSwitcher'

export function App() {
  return (
    <ThemeProvider>
      <div className="max-w-page px-margin-xl mx-auto py-8">
        <header className="mb-8 flex items-center justify-between">
          <span className="text-label-code text-muted font-mono">PORTFOLIO // 2.0</span>
          <ThemeSwitcher />
        </header>
        <div className="border-hairline bg-surface rounded-card shadow-card p-6">
          <h1 className="text-headline-xl text-fg">Professional Portfolio 2.0</h1>
          <p className="text-body-md text-muted mt-2">
            Personal portfolio for a full-stack developer (React + .NET).
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}
