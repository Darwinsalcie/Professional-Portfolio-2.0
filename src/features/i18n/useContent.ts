import { useMemo } from 'react'
import { getContent } from '@/content'
import { useLocale } from './useLocale'
import type { SiteContent } from '@/types/content'

/**
 * Hook returning typed site content for the active locale.
 */
export function useContent(): SiteContent {
  const { locale } = useLocale()
  return useMemo(() => getContent(locale), [locale])
}
