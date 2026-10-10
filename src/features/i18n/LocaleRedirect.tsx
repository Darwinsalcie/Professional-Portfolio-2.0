import { Navigate } from 'react-router'
import { detectLocale } from './locale'

export function LocaleRedirect() {
  const targetLocale = detectLocale()
  return <Navigate to={`/${targetLocale}`} replace />
}
