import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'glow' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      icon,
      iconRight,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          'select-none cursor-pointer',
          'active:scale-[0.98]',
          // Variants
          {
            // Default (Primary)
            'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-md btn-glow':
              variant === 'default' || variant === 'primary',

            // Destructive
            'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/20':
              variant === 'destructive',

            // Outline
            'border border-border bg-transparent text-foreground shadow-sm hover:bg-muted/50 hover:border-border/80 hover:shadow-md':
              variant === 'outline',

            // Secondary
            'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md':
              variant === 'secondary',

            // Ghost
            'text-foreground hover:bg-muted/50 hover:text-foreground':
              variant === 'ghost',

            // Link
            'text-primary underline-offset-4 hover:underline p-0 h-auto':
              variant === 'link',

            // Glow
            'bg-primary text-primary-foreground shadow-sm btn-glow hover:shadow-lg':
              variant === 'glow',

            // Gradient
            'gradient-primary text-primary-foreground shadow-sm hover:shadow-md btn-glow':
              variant === 'gradient',
          },
          // Sizes
          {
            'h-10 px-5 py-2 text-sm rounded-xl': size === 'default',
            'h-8 px-3 text-xs rounded-lg gap-1.5': size === 'sm',
            'h-12 px-8 text-base rounded-xl': size === 'lg',
            'h-10 w-10 p-0 rounded-xl': size === 'icon',
            'h-14 px-10 text-lg rounded-2xl': size === 'xl',
          },
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading || undefined}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : icon ? (
          <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        ) : null}
        {children}
        {iconRight && !loading && (
          <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">{iconRight}</span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
