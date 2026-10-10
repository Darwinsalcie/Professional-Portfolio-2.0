import { Link } from 'react-router'
import { Container } from '@/components/Container'

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <p className="text-label-code text-accent-fg font-mono">404 // NOT FOUND</p>
      <h1 className="text-headline-lg text-fg mt-2 font-semibold">Page Not Found</h1>
      <p className="text-body-md text-muted mt-4">The requested page does not exist.</p>
      <div className="mt-8">
        <Link
          to="/"
          className="rounded-control bg-accent text-body-sm text-on-accent hover:bg-accent-hover inline-flex px-6 py-2.5 font-mono transition-colors"
        >
          Return Home
        </Link>
      </div>
    </Container>
  )
}
