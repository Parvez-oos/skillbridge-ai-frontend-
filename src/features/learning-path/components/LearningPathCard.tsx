import Link from 'next/link';
import { LearningPath } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Users, Star, ChevronRight } from 'lucide-react';

interface LearningPathCardProps {
  learningPath: LearningPath;
  className?: string;
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function LearningPathCard({ learningPath, className }: LearningPathCardProps) {
  return (
    <Link href={`/learning-paths/${learningPath.slug}`}>
      <div className={cn('rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 cursor-pointer h-full group', className)}>
        <div className="relative overflow-hidden">
          {learningPath.thumbnail ? (
            <img
              src={learningPath.thumbnail}
              alt={learningPath.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/20">
                {learningPath.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm', difficultyColors[learningPath.difficulty])}>
              {learningPath.difficulty}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-lg border border-border/50 bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {learningPath.category}
            </span>
          </div>

          <h3 className="text-lg font-semibold line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            {learningPath.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
            {learningPath.shortDescription}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{learningPath.duration}h</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{learningPath.studentsCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span>{learningPath.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-end mt-4">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all duration-200">
              View Details <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
