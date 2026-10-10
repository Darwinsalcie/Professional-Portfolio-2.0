import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  grid?: boolean
}

export function Container({ className, children, grid = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'max-w-page px-margin md:px-margin-md xl:px-margin-xl mx-auto',
        grid &&
          'gap-gutter md:gap-gutter-md xl:gap-gutter-xl grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
