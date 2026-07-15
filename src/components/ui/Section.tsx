import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  overline?: string;
}

export function SectionHeader({ title, description, className, overline }: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-14', className)}>
      {overline && (
        <span className="font-overline text-primary mb-3 block">{overline}</span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight mb-4">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
