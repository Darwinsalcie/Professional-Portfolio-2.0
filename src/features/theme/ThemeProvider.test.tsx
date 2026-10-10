import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@/test/render'
import { THEME_STORAGE_KEY } from './theme-constants'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './useTheme'

describe('ThemeProvider and useTheme', () => {
  let mediaListeners: ((e: { matches: boolean }) => void)[] = []
  let matchesDark = false

  beforeEach(() => {
    mediaListeners = []
    matchesDark = false

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)' ? matchesDark : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_event: string, listener: unknown) => {
          mediaListeners.push(listener as (e: { matches: boolean }) => void)
        }),
        removeEventListener: vi.fn((_event: string, listener: unknown) => {
          mediaListeners = mediaListeners.filter((l) => l !== listener)
        }),
        dispatchEvent: vi.fn(),
      })),
    })

    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme-choice')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.remove()
    }
  })

  it('throws an error if useTheme is called outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider',
    )
  })

  it('initializes with default system choice and resolves based on prefersDark', () => {
    matchesDark = false
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    })

    expect(result.current.choice).toBe('system')
    expect(result.current.resolved).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('updates choice and persists to localStorage on setChoice', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    })

    act(() => {
      result.current.setChoice('glass')
    })

    expect(result.current.choice).toBe('glass')
    expect(result.current.resolved).toBe('glass')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('glass')
    expect(document.documentElement.getAttribute('data-theme')).toBe('glass')
    expect(document.documentElement.getAttribute('data-theme-choice')).toBe('glass')

    const meta = document.querySelector('meta[name="theme-color"]')
    expect(meta?.getAttribute('content')).toBe('#131315')
  })

  it('reacts to live system scheme changes when choice is system', () => {
    matchesDark = false
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    })

    expect(result.current.resolved).toBe('light')

    act(() => {
      mediaListeners.forEach((listener) => {
        listener({ matches: true })
      })
    })

    expect(result.current.resolved).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('does not react to system scheme changes when choice is explicit', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider defaultChoice="light">{children}</ThemeProvider>,
    })

    expect(result.current.resolved).toBe('light')

    act(() => {
      mediaListeners.forEach((listener) => {
        listener({ matches: true })
      })
    })

    expect(result.current.resolved).toBe('light')
  })

  it('handles storage errors during setChoice without crashing', () => {
    const mockStorage = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn().mockImplementation(() => {
        throw new Error('Quota exceeded')
      }),
    } as unknown as Storage

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider storage={mockStorage}>{children}</ThemeProvider>,
    })

    expect(() => {
      act(() => {
        result.current.setChoice('dark')
      })
    }).not.toThrow()

    expect(result.current.choice).toBe('dark')
    expect(result.current.resolved).toBe('dark')
  })

  it('renders children properly inside ThemeProvider', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Hello Theme</div>
      </ThemeProvider>,
    )

    expect(getByText('Hello Theme')).toBeInTheDocument()
  })
})
