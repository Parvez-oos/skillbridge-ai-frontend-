import { InputHTMLAttributes, forwardRef, ReactNode, useId } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: boolean;
  success?: boolean;
  errorId?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, success, errorId, ...props }, ref) => {
    const autoId = useId();
    const describedBy = error && errorId ? errorId : undefined;

    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none [&>svg]:w-4 [&>svg]:h-4" aria-hidden="true">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border border-border bg-muted/30 text-sm text-foreground shadow-sm transition-all duration-200',
            icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5',
            'placeholder:text-muted-foreground/60',
            'hover:border-border/80 hover:bg-muted/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary/50 focus-visible:bg-muted/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive/40 focus-visible:border-destructive',
            success && 'border-success focus-visible:ring-success/40 focus-visible:border-success',
            className
          )}
          ref={ref}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
