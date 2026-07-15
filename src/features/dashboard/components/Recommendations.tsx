'use client';

import Link from 'next/link';
import { Recommendation } from '../types';
import { Clock, Users, Star, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationsProps {
  recommendations: Recommendation[] | undefined;
  isLoading: boolean;
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function Recommendations({ recommendations, isLoading }: RecommendationsProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
        <h3 className="font-semibold text-lg mb-4">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-20 h-20 rounded-xl bg-muted/50 shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-muted/50 rounded-lg w-3/4 mb-2" />
                <div className="h-3 bg-muted/50 rounded-lg w-1/2 mb-2" />
                <div className="h-3 bg-muted/50 rounded-lg w-1/3" />
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
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Recommended For You</h3>
        </div>
        <Link href="/learning-paths" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Explore More <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {!recommendations || recommendations.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No recommendations available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((rec) => (
            <Link
              key={rec._id}
              href={`/learning-paths/${rec.slug}`}
              className="flex gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors group"
            >
              {rec.thumbnail ? (
                <img
                  src={rec.thumbnail}
                  alt={rec.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary/30">
                    {rec.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">{rec.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn('inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-medium', difficultyColors[rec.difficulty])}>
                    {rec.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">{rec.category}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {rec.duration}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    {rec.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
