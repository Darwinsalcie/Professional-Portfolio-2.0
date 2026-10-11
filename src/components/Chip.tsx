import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const chipVariants = cva('inline-flex items-center font-mono select-none', {
  variants: {
    variant: {
      default:
        'text-label-caps px-3 py-1 rounded-chip bg-white/[0.04] text-muted border border-hairline',
      ledger:
        'font-body text-body-sm px-3.5 py-2 rounded-lg bg-white/[0.04] text-fg border border-hairline/50',
      active: 'text-label-caps px-3 py-1 rounded-chip bg-accent text-on-accent font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {}

/**
 * Chip badge primitive for stack items, tags, and category labels.
 */
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(chipVariants({ variant }), className)} {...props}>
        {children}
      </span>
    )
  },
)

Chip.displayName = 'Chip'
