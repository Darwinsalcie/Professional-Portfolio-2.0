import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

export function RadioGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        'rounded-nav border-hairline bg-control inline-flex items-center gap-1 border p-0.5',
        className,
      )}
      {...props}
    />
  )
}

export function RadioGroupItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'rounded-nav text-label-code inline-flex cursor-pointer items-center justify-center px-2.5 py-1 font-mono transition-colors select-none',
        'text-subtle hover:text-fg focus-visible:outline-focus focus-visible:outline-2 focus-visible:outline-offset-1',
        'data-[state=checked]:bg-surface-hover data-[state=checked]:text-fg data-[state=checked]:font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}
