import * as React from 'react'
import { cn } from '@/lib/cn'

export interface MonogramProps extends React.SVGAttributes<SVGSVGElement> {
  initials?: string
  size?: number
}

/**
 * Geometric architectural monogram SVG brand mark.
 */
export const Monogram = React.forwardRef<SVGSVGElement, MonogramProps>(
  ({ className, initials = 'NJ', size = 32, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('text-accent-fg shrink-0', className)}
        aria-hidden="true"
        {...props}
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
          className="stroke-hairline-strong fill-surface"
        />
        <path
          d="M7 23V9L15 19V9M17 19C17 21.2091 18.7909 23 21 23C23.2091 23 25 21.2091 25 19V9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-accent-fg"
        />
        <text x="0" y="0" className="sr-only">
          {initials}
        </text>
      </svg>
    )
  },
)

Monogram.displayName = 'Monogram'
