import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const cardVariants = cva('border border-hairline transition-all duration-300', {
  variants: {
    variant: {
      card: 'bg-surface backdrop-blur-2xl rounded-card shadow-card hover:bg-surface-hover hover:border-hairline-strong',
      panel: 'bg-surface backdrop-blur-2xl rounded-panel shadow-panel',
      sunken: 'bg-surface-sunken rounded-card border-hairline',
    },
  },
  defaultVariants: {
    variant: 'card',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  as?: 'div' | 'article' | 'section'
}

/**
 * Translucent surface container supporting card and panel elevations.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, as = 'div', children, ...props }, ref) => {
    const Component = as

    return (
      <Component ref={ref} className={cn(cardVariants({ variant }), className)} {...props}>
        {children}
      </Component>
    )
  },
)

Card.displayName = 'Card'
