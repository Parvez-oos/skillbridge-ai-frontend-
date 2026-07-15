'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { Container } from '@/components/ui/Container';
import { useDashboardData } from '@/features/dashboard/hooks/useDashboard';
import { StatsCards } from '@/features/dashboard/components/StatsCards';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';
import { LearningProgress } from '@/features/dashboard/components/LearningProgress';
import { Recommendations } from '@/features/dashboard/components/Recommendations';
import { MonthlyActivityChart } from '@/features/dashboard/components/MonthlyActivityChart';
import { CategoryDistributionChart } from '@/features/dashboard/components/CategoryDistributionChart';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, Clock, Trophy } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <Container>
        <div className="space-y-6 py-8">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight font-heading">Welcome to SkillBridge AI</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed font-body">
            Start your learning journey today! Explore our AI-powered learning paths.
          </p>
          <Link href="/learning-paths">
            <Button size="lg" className="btn-glow">
              Explore Learning Paths
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <Container>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 py-8"
      >
        <motion.div variants={item}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="font-overline text-primary mb-2 block">Dashboard</span>
              <h1 className="text-2xl md:text-3xl font-heading tracking-tight">
                {greeting}, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-muted-foreground mt-1 font-body">
                Here is what is happening with your learning journey.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-success/10 border border-success/20 text-success text-sm font-medium">
                <Zap className="w-3.5 h-3.5" />
                <span>12 day streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Trophy className="w-3.5 h-3.5" />
                <span>Level 8</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <StatsCards stats={data?.stats} isLoading={isLoading} />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LearningProgress progress={data?.learningProgress} isLoading={isLoading} />
          <RecentActivity activities={data?.recentActivity} isLoading={isLoading} />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyActivityChart data={data?.monthlyActivity} isLoading={isLoading} />
          <CategoryDistributionChart data={data?.categoryDistribution} isLoading={isLoading} />
        </motion.div>

        <motion.div variants={item}>
          <Recommendations recommendations={data?.recommendations} isLoading={isLoading} />
        </motion.div>
      </motion.div>
    </Container>
  );
}
