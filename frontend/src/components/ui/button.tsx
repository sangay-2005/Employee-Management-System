import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none'
    const variants: Record<string, string> = {
      default: 'bg-black text-white hover:bg-neutral-800',
      ghost: 'hover:bg-neutral-100'
    }
    const sizes: Record<string, string> = {
      sm: 'h-8 px-2',
      md: 'h-9 px-3',
      lg: 'h-10 px-4',
      icon: 'h-9 w-9'
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    )
  }
)
Button.displayName = 'Button'
