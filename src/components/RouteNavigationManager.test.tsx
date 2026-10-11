import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RouteNavigationManager } from './RouteNavigationManager'

function NavigationTestHarness() {
  const navigate = useNavigate()
  return (
    <>
      <RouteNavigationManager />
      <button
        type="button"
        onClick={() => {
          void navigate('/en/work/alpha-platform')
        }}
      >
        Go to Alpha
      </button>
      <main>
        <Routes>
          <Route path="/en" element={<h1>Initial Page</h1>} />
          <Route
            path="/en/work/alpha-platform"
            element={<h1 id="page-heading">Alpha Platform</h1>}
          />
        </Routes>
      </main>
    </>
  )
}

describe('RouteNavigationManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.scrollTo = vi.fn()
  })

  it('renders a polite status live region for screen reader announcements', () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <RouteNavigationManager />
      </MemoryRouter>,
    )

    const announcer = screen.getByTestId('route-announcer')
    expect(announcer).toHaveAttribute('role', 'status')
    expect(announcer).toHaveAttribute('aria-live', 'polite')
  })

  it('scrolls to top on navigation and focuses h1 in main', () => {
    vi.useFakeTimers()

    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    render(
      <MemoryRouter initialEntries={['/en']}>
        <NavigationTestHarness />
      </MemoryRouter>,
    )

    // Click link to trigger real in-router navigation
    const button = screen.getByRole('button', { name: 'Go to Alpha' })
    act(() => {
      button.click()
    })

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    const h1 = document.getElementById('page-heading')
    expect(h1).toHaveAttribute('tabindex', '-1')
    expect(document.activeElement).toBe(h1)

    const announcer = screen.getByTestId('route-announcer')
    expect(announcer).toHaveTextContent(/Navigated to Alpha Platform/i)

    vi.useRealTimers()
  })

  it('scrolls hash anchor into view when hash is provided', () => {
    const scrollIntoViewMock = vi.fn()
    const targetElement = document.createElement('div')
    targetElement.id = 'contact'
    targetElement.scrollIntoView = scrollIntoViewMock
    document.body.appendChild(targetElement)

    render(
      <MemoryRouter initialEntries={['/en#contact']}>
        <Routes>
          <Route
            path="/en"
            element={
              <>
                <RouteNavigationManager />
                <main>
                  <h1>Home</h1>
                </main>
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
    document.body.removeChild(targetElement)
  })
})
