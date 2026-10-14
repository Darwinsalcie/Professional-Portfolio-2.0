import { useEffect, useState } from 'react'

/**
 * Tracks the currently active section in the viewport using IntersectionObserver.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140 // Offset for sticky header and comfort zone

      // If at very bottom of document, activate the last section (typically contact)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        const lastId = sectionIds[sectionIds.length - 1]
        if (lastId) {
          setActiveId(lastId)
          return
        }
      }

      // Check each section position
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            current = id
          }
        }
      }

      setActiveId(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionIds])

  return activeId
}
