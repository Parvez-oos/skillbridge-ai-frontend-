import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className, as: Component = 'div', size = 'default' }: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        {
          'max-w-7xl': size === 'default',
          'max-w-5xl': size === 'sm',
          'max-w-8xl': size === 'lg',
          'max-w-[90rem]': size === 'xl',
          'max-w-full': size === 'full',
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
