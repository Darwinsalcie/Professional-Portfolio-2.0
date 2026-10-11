import * as React from 'react'
import { cn } from '@/lib/cn'

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'div'
}

/**
 * Accessible visually hidden element, readable by screen readers.
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, as = 'span', children, ...props }, ref) => {
    if (as === 'div') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            'absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <span
        ref={ref}
        className={cn(
          'absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]',
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)

VisuallyHidden.displayName = 'VisuallyHidden'
