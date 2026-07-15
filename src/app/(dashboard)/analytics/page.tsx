'use client';

import { Container } from '@/components/ui/Container';
import { useDashboardStats, useMonthlyActivity, useCategoryDistribution } from '@/features/dashboard/hooks/useDashboard';
import { MonthlyActivityChart } from '@/features/dashboard/components/MonthlyActivityChart';
import { CategoryDistributionChart } from '@/features/dashboard/components/CategoryDistributionChart';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, TrendingUp, Flame, Star, Target, Zap, BarChart3 } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AnalyticsPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: monthlyData, isLoading: monthlyLoading } = useMonthlyActivity();
  const { data: categoryData, isLoading: categoryLoading } = useCategoryDistribution();

  if (statsLoading) {
    return (
      <Container>
        <div className="space-y-6 py-8">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  const detailedStats = [
    { icon: BookOpen, label: 'Total Learning Paths', value: stats?.totalLearningPaths ?? 0, description: 'Paths you have enrolled in', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    { icon: Award, label: 'Completed Paths', value: stats?.completedPaths ?? 0, description: 'Successfully completed', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
    { icon: Clock, label: 'In Progress', value: stats?.inProgressPaths ?? 0, description: 'Currently learning', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
    { icon: TrendingUp, label: 'Hours Learned', value: stats?.totalHoursLearned ?? 0, description: 'Total study time', color: 'text-info', bg: 'bg-info/10', border: 'border-info/20' },
    { icon: Flame, label: 'Learning Streak', value: `${stats?.learningStreak ?? 0} days`, description: 'Keep it going!', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20' },
    { icon: Star, label: 'Average Rating', value: stats?.averageRating?.toFixed(1) ?? '0.0', description: 'Your average course rating', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
  ];

  return (
    <Container>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 py-8"
      >
        <motion.div variants={item}>
          <span className="font-overline text-primary mb-2 block">Analytics</span>
          <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1 font-body">
            Track your learning progress and insights.
          </p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {detailedStats.map((stat) => (
            <div key={stat.label} className={`p-5 rounded-2xl border ${stat.border} bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group hover-lift`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyActivityChart data={monthlyData} isLoading={monthlyLoading} />
          <CategoryDistributionChart data={categoryData} isLoading={categoryLoading} />
        </motion.div>

        <motion.div variants={item} className="p-6 rounded-2xl border border-border/50 bg-card/50">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg font-heading">Learning Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-5 bg-muted/30 rounded-xl border border-border/30 hover-glow">
              <p className="text-3xl font-bold text-primary mb-1">
                {stats?.totalHoursLearned ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">Total Hours</p>
            </div>
            <div className="text-center p-5 bg-muted/30 rounded-xl border border-border/30 hover-glow">
              <p className="text-3xl font-bold text-success mb-1">
                {stats?.completedPaths ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-5 bg-muted/30 rounded-xl border border-border/30 hover-glow">
              <p className="text-3xl font-bold text-warning mb-1">
                {stats?.inProgressPaths ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
}
