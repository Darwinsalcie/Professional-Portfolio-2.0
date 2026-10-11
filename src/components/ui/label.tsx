import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/cn'

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>

export const Label = React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn('text-label-caps text-fg font-mono tracking-wider uppercase', className)}
      {...props}
    />
  ),
)
Label.displayName = 'Label'
