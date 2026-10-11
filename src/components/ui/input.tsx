import * as React from 'react'
import { cn } from '@/lib/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'rounded-control border-hairline bg-surface/60 font-body text-body-md text-fg placeholder:text-subtle focus-visible:ring-focus focus-visible:border-focus aria-invalid:border-danger aria-invalid:focus-visible:ring-danger flex h-12 w-full border px-4 py-3 transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'
