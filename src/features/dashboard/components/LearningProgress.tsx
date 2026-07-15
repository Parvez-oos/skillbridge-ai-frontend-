'use client';

import Link from 'next/link';
import { LearningProgress as LearningProgressType } from '../types';
import { BookOpen, ChevronRight } from 'lucide-react';

interface LearningProgressProps {
  progress: LearningProgressType[] | undefined;
  isLoading: boolean;
}

export function LearningProgress({ progress, isLoading }: LearningProgressProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
        <h3 className="font-semibold text-lg mb-4">Continue Learning</h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-16 h-16 rounded-xl bg-muted/50" />
              <div className="flex-1">
                <div className="h-4 bg-muted/50 rounded-lg w-3/4 mb-2" />
                <div className="h-2 bg-muted/50 rounded-lg w-full" />
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
        <h3 className="font-semibold text-lg">Continue Learning</h3>
        <Link href="/learning" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {!progress || progress.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">No learning paths in progress</p>
          <Link href="/learning-paths" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Explore Paths <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {progress.map((item) => (
            <Link
              key={item._id}
              href={`/learning-paths/${item.learningPath.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors group"
            >
              {item.learningPath.thumbnail ? (
                <img
                  src={item.learningPath.thumbnail}
                  alt={item.learningPath.title}
                  className="w-14 h-14 rounded-xl object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{item.learningPath.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{item.learningPath.category}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{item.progress}%</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
