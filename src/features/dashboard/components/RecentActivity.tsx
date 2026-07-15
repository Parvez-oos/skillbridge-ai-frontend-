'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { RecentActivity as RecentActivityType } from '../types';
import { BookOpen, CheckCircle2, TrendingUp, Award, Clock, ChevronRight } from 'lucide-react';

interface RecentActivityProps {
  activities: RecentActivityType[] | undefined;
  isLoading: boolean;
}

const activityIcons = {
  enrolled: { icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  completed: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  progress: { icon: TrendingUp, color: 'text-info', bg: 'bg-info/10' },
  achievement: { icon: Award, color: 'text-warning', bg: 'bg-warning/10' },
};

export const RecentActivity = memo(function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  const skeletonItems = useMemo(() => Array.from({ length: 4 }), []);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {skeletonItems.map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-muted/50" />
              <div className="flex-1">
                <div className="h-4 bg-muted/50 rounded-lg w-3/4 mb-1" />
                <div className="h-3 bg-muted/50 rounded-lg w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-lg">Recent Activity</h3>
        {activities && activities.length > 0 && (
          <Link href="/learning" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {!activities || activities.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const config = activityIcons[activity.type as keyof typeof activityIcons] || activityIcons.enrolled;
            const Icon = config.icon;

            return (
              <div
                key={activity._id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors"
              >
                <div className={`p-2 rounded-xl ${config.bg} shrink-0`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
