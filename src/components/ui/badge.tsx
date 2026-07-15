import { cn } from '@/lib/utils';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' | 'ghost' | 'gradient';
  size?: 'default' | 'sm' | 'lg';
}

function Badge({ className, variant = 'default', size = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        {
          // Variants
          'bg-primary text-primary-foreground': variant === 'default',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-destructive text-destructive-foreground': variant === 'destructive',
          'border border-border text-foreground bg-transparent': variant === 'outline',
          'bg-success/10 text-success border border-success/20': variant === 'success',
          'bg-warning/10 text-warning border border-warning/20': variant === 'warning',
          'bg-info/10 text-info border border-info/20': variant === 'info',
          'bg-muted/50 text-muted-foreground hover:bg-muted/80': variant === 'ghost',
          'gradient-primary text-primary-foreground': variant === 'gradient',
        },
        {
          // Sizes
          'px-2.5 py-0.5 text-[10px]': size === 'sm',
          'px-3 py-1 text-xs': size === 'default',
          'px-4 py-1.5 text-sm': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
