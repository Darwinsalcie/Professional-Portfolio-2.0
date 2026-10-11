import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const beaconVariants = cva('inline-flex items-center gap-2 font-mono text-label-code', {
  variants: {
    status: {
      success: 'text-success',
      info: 'text-eyebrow-tertiary',
      muted: 'text-muted',
    },
  },
  defaultVariants: {
    status: 'success',
  },
})

export interface StatusBeaconProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof beaconVariants> {
  label: string
  pulse?: boolean
}

/**
 * Status beacon pill with an indicator dot and optional pulsing animation.
 */
export const StatusBeacon = React.forwardRef<HTMLSpanElement, StatusBeaconProps>(
  ({ className, status, label, pulse = true, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(beaconVariants({ status }), className)} {...props}>
        <span className={cn('relative flex size-2')} aria-hidden="true">
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping',
                status === 'success' && 'bg-success',
                status === 'info' && 'bg-eyebrow-tertiary',
                status === 'muted' && 'bg-muted',
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex size-2 rounded-full',
              status === 'success' && 'bg-success',
              status === 'info' && 'bg-eyebrow-tertiary',
              status === 'muted' && 'bg-muted',
            )}
          />
        </span>
        <span>{label}</span>
      </span>
    )
  },
)

StatusBeacon.displayName = 'StatusBeacon'
