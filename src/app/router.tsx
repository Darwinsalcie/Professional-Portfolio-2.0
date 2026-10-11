import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { LocaleRedirect } from '@/features/i18n/LocaleRedirect'
import { LocaleRouteLayout } from '@/features/i18n/LocaleRouteLayout'
import { LazyCaseStudyPage, LazyHomePage, LazyNotFoundPage } from '@/pages/lazy'
import { RootLayout } from './RootLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LocaleRedirect />,
  },
  {
    path: '/:lang',
    element: <LocaleRouteLayout />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={null}>
                <LazyHomePage />
              </Suspense>
            ),
          },
          {
            path: 'work/:slug',
            element: (
              <Suspense fallback={null}>
                <LazyCaseStudyPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={null}>
        <LazyNotFoundPage />
      </Suspense>
    ),
  },
])
