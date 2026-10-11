import '@testing-library/jest-dom/vitest'
import * as matchers from 'vitest-axe/matchers'
import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// Polyfill IntersectionObserver for jsdom test environment used by motion whileInView
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin: string = ''
    readonly scrollMargin: string = ''
    readonly thresholds: readonly number[] = []
    disconnect(): void {
      // noop
    }
    observe(): void {
      // noop
    }
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
    unobserve(): void {
      // noop
    }
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}
