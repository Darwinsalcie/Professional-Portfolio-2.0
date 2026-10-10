import { Navigate, Outlet, useParams } from 'react-router'
import { isLocale } from './locale'
import { LocaleProvider } from './LocaleProvider'

export function LocaleRouteLayout() {
  const { lang } = useParams<{ lang: string }>()

  if (!isLocale(lang)) {
    return <Navigate to="/404" replace />
  }

  return (
    <LocaleProvider currentLocale={lang}>
      <Outlet />
    </LocaleProvider>
  )
}
