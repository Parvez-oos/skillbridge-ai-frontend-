import { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
  errorId?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, errorId, ...props }, ref) => {
    const describedBy = error && errorId ? errorId : undefined;

    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-200 resize-none',
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
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
