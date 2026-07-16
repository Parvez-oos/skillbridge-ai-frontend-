'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  className?: string;
  color?: 'primary' | 'success' | 'warning' | 'destructive' | 'info';
}

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
};

export const StatCard = memo(function StatCard({
  title,
  value,
  icon,
  change,
  changeLabel = 'vs last month',
  className,
  color = 'primary',
}: StatCardProps) {
  return (
    <Card variant="elevated" className={cn('p-5', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {change > 0 ? (
                <TrendingUp size={12} className="text-success" />
              ) : change < 0 ? (
                <TrendingDown size={12} className="text-destructive" />
              ) : (
                <Minus size={12} className="text-muted-foreground" />
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  change > 0 ? 'text-success' : change < 0 ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-[10px] text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', colorMap[color])}>
          {icon}
        </div>
      </div>
    </Card>
  );
});
