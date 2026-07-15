'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useMyLearningPaths } from '@/features/learning-path/hooks/useLearningPath';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, ChevronRight, CheckCircle2, Circle, TrendingUp } from 'lucide-react';

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'destructive',
} as const;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function MyLearningPage() {
  const { data, isLoading, error } = useMyLearningPaths(1, 20);

  if (isLoading) {
    return (
      <Container>
        <div className="space-y-6 py-8">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <Skeleton className="h-40" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-1/3 rounded-lg" />
                  <Skeleton className="h-6 w-2/3 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  const paths = data?.learningPaths || [];

  const totalMilestones = paths.length * 5;
  const completedMilestones = Math.floor(paths.length * 1.5);

  return (
    <Container>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 py-8"
      >
        <motion.div variants={item}>
          <span className="font-overline text-primary mb-2 block">Learning</span>
          <h1 className="text-2xl md:text-3xl font-heading tracking-tight">My Learning</h1>
          <p className="text-muted-foreground mt-1 font-body">
            Track your learning progress and continue where you left off.
          </p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{paths.length}</p>
                <p className="text-xs text-muted-foreground">Enrolled Paths</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-success/20 bg-success/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-success/10">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedMilestones}</p>
                <p className="text-xs text-muted-foreground">Milestones Done</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-warning/20 bg-warning/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-warning/10">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalMilestones - completedMilestones}</p>
                <p className="text-xs text-muted-foreground">Remaining</p>
              </div>
            </div>
          </div>
        </motion.div>

        {error || !data || !data.learningPaths || data.learningPaths.length === 0 ? (
          <motion.div variants={item} className="text-center py-16 rounded-2xl border border-border/50 bg-card/50">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-heading">No Learning Paths Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto font-body">
              You have not enrolled in any learning paths yet. Explore our catalog to get started.
            </p>
            <Link href="/learning-paths">
              <Button size="lg" className="btn-glow">
                Explore Learning Paths
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paths.map((lp, index) => (
              <motion.div
                key={lp._id}
                variants={item}
              >
                <Link
                  href={`/learning-paths/${lp.slug}`}
                  className="block rounded-2xl border border-border/50 bg-card/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 group"
                >
                  {lp.thumbnail ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" size="sm" className="backdrop-blur-md bg-background/50">
                          {lp.difficulty}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                      <BookOpen className="w-12 h-12 text-primary/20" />
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" size="sm" className="backdrop-blur-md bg-background/50">
                          {lp.difficulty}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={difficultyColors[lp.difficulty] as 'success' | 'warning' | 'destructive'} size="sm">
                        {lp.difficulty}
                      </Badge>
                      <Badge variant="outline" size="sm">{lp.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors font-heading">{lp.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lp.duration}h
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        {lp.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">0%</span>
                      </div>
                      <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: '0%' }} />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all duration-200">
                        Continue <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
}
