import { createBrowserRouter } from 'react-router'
import { LocaleRedirect } from '@/features/i18n/LocaleRedirect'
import { LocaleRouteLayout } from '@/features/i18n/LocaleRouteLayout'
import { CaseStudyPage } from '@/pages/CaseStudyPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
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
            element: <HomePage />,
          },
          {
            path: 'work/:slug',
            element: <CaseStudyPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
