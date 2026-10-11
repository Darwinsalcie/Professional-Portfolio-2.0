import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

/**
 * RouteNavigationManager manages accessible navigation side-effects:
 * 1. Scrolls to top on pathname changes (unless hash is present).
 * 2. If a hash is provided, smoothly scrolls to the element with header offset.
 * 3. Focuses the page's primary <h1> (with tabIndex -1) for screen readers and keyboard users.
 * 4. Announces route changes via an accessible aria-live region.
 */
export function RouteNavigationManager() {
  const { pathname, hash } = useLocation()
  const [announcement, setAnnouncement] = useState('')
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (hash) {
        const id = hash.replace(/^#/, '')
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
      return
    }

    if (hash) {
      const id = hash.replace(/^#/, '')
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    // Allow time for route content to render, then focus primary h1 and update announcer
    const timer = setTimeout(() => {
      const h1 = document.querySelector<HTMLElement>('main h1')
      if (h1) {
        if (!h1.hasAttribute('tabindex')) {
          h1.setAttribute('tabindex', '-1')
        }
        h1.focus({ preventScroll: true })
        const text = h1.textContent.trim()
        const pageTitle = text.length > 0 ? text : document.title
        setAnnouncement(`Navigated to ${pageTitle}`)
      } else {
        setAnnouncement(`Navigated to ${document.title}`)
      }
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname, hash])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      data-testid="route-announcer"
    >
      {announcement}
    </div>
  )
}
