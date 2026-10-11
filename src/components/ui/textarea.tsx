import * as React from 'react'
import { cn } from '@/lib/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'rounded-control border-hairline bg-surface/60 font-body text-body-md text-fg placeholder:text-subtle focus-visible:ring-focus focus-visible:border-focus aria-invalid:border-danger aria-invalid:focus-visible:ring-danger flex min-h-[140px] w-full resize-y border px-4 py-3 transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'
