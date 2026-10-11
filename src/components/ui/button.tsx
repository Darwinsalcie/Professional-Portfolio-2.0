import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-on-accent rounded-control shadow-card hover:bg-accent-hover hover:text-on-accent active:scale-[0.99]',
        ghost:
          'bg-white/[0.04] backdrop-blur-xl text-fg rounded-control border border-hairline hover:bg-white/[0.08] hover:border-hairline-strong active:scale-[0.99]',
        mono: 'font-mono text-label-code text-accent-fg hover:underline p-0 gap-1.5 focus-visible:outline-offset-1',
      },
      size: {
        sm: 'px-3 py-1.5 text-body-sm rounded-control',
        md: 'px-6 py-3 text-body-md rounded-control',
        lg: 'px-8 py-4 text-body-md font-semibold rounded-control',
        icon: 'size-9 p-0 rounded-control',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showArrow?: boolean
}

/**
 * Design system button primitive supporting primary, ghost, and mono variants.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, showArrow, children, type = 'button', ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button'
    const buttonType = asChild ? undefined : type

    const renderArrow = () => {
      if (showArrow === false) return null
      if (variant === 'mono') {
        return (
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        )
      }
      if (showArrow || variant === 'primary') {
        return (
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        )
      }
      return null
    }

    return (
      <Component
        ref={ref}
        type={buttonType}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span>{children}</span>
            {renderArrow()}
          </>
        )}
      </Component>
    )
  },
)

Button.displayName = 'Button'
