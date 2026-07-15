'use client';

import { memo, useMemo } from 'react';
import { DashboardStats } from '../types';
import { BookOpen, Clock, Award, TrendingUp, Flame, Star } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
}

const statIcons: Array<{ key: keyof DashboardStats; icon: React.ElementType; label: string; color: string; bg: string }> = [
  { key: 'totalLearningPaths', icon: BookOpen, label: 'Total Paths', color: 'text-primary', bg: 'bg-primary/10' },
  { key: 'completedPaths', icon: Award, label: 'Completed', color: 'text-success', bg: 'bg-success/10' },
  { key: 'inProgressPaths', icon: Clock, label: 'In Progress', color: 'text-warning', bg: 'bg-warning/10' },
  { key: 'totalHoursLearned', icon: TrendingUp, label: 'Hours Learned', color: 'text-info', bg: 'bg-info/10' },
  { key: 'learningStreak', icon: Flame, label: 'Day Streak', color: 'text-destructive', bg: 'bg-destructive/10' },
  { key: 'averageRating', icon: Star, label: 'Avg Rating', color: 'text-secondary', bg: 'bg-secondary/10' },
];

export const StatsCards = memo(function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const skeletonItems = useMemo(() => Array.from({ length: 6 }), []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skeletonItems.map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-muted/50" />
              <div>
                <div className="h-7 w-16 rounded-lg bg-muted/50 mb-2" />
                <div className="h-4 w-20 rounded-lg bg-muted/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statIcons.map(({ key, icon: Icon, label, color, bg }) => (
        <div key={label} className="rounded-2xl border border-border/50 bg-card/50 p-5 hover:bg-card hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${bg} ${color} transition-transform duration-300 group-hover:scale-110`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">
                {stats ? stats[key] : 0}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
