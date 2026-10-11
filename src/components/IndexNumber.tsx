import * as React from 'react'
import { cn } from '@/lib/cn'

export interface IndexNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number | string
}

/**
 * Format a zero-padded index number (e.g. 01, 02) styled in JetBrains Mono.
 */
export const IndexNumber = React.forwardRef<HTMLSpanElement, IndexNumberProps>(
  ({ className, value, ...props }, ref) => {
    const formatted =
      typeof value === 'number' ? value.toString().padStart(2, '0') : value.padStart(2, '0')

    return (
      <span
        ref={ref}
        className={cn('text-label-code text-index font-mono select-none', className)}
        aria-hidden="true"
        {...props}
      >
        {formatted}
      </span>
    )
  },
)

IndexNumber.displayName = 'IndexNumber'
