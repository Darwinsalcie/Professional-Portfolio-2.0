import { cn } from '@/lib/cn'

export interface SkipLinkProps {
  targetId?: string
  label?: string
}

export function SkipLink({ targetId = 'main', label = 'Skip to main content' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'rounded-control bg-accent text-body-sm text-on-accent shadow-float sr-only fixed top-4 left-4 z-50 px-4 py-2 font-mono focus:not-sr-only',
      )}
    >
      {label}
    </a>
  )
}
