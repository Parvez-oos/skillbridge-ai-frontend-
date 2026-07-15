'use client';

import { use } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearningPathBySlug, useLearningPaths } from '@/features/learning-path/hooks/useLearningPath';
import { LearningPathCard } from '@/features/learning-path/components/LearningPathCard';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  Clock,
  Users,
  Star,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Share2,
  MessageSquare,
} from 'lucide-react';

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'destructive',
} as const;

const PLACEHOLDER_REVIEWS = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: null,
    rating: 5,
    date: '2025-12-15',
    title: 'Excellent learning path!',
    comment: 'This path gave me a solid foundation in the subject matter. The curriculum is well-structured and the projects are practical. Highly recommended for anyone serious about learning.',
    helpful: 24,
  },
  {
    id: '2',
    author: 'Marcus Johnson',
    avatar: null,
    rating: 4,
    date: '2025-11-28',
    title: 'Great content, could use more exercises',
    comment: 'The theory sections are outstanding and clearly explained. I would have liked more hands-on exercises, but overall this is a fantastic learning experience.',
    helpful: 18,
  },
  {
    id: '3',
    author: 'Priya Sharma',
    avatar: null,
    rating: 5,
    date: '2025-11-10',
    title: 'Career-changing experience',
    comment: 'After completing this path, I landed my dream job. The skills I learned here are directly applicable to real-world projects. The instructor is knowledgeable and responsive.',
    helpful: 31,
  },
  {
    id: '4',
    author: 'Alex Rivera',
    avatar: null,
    rating: 4,
    date: '2025-10-22',
    title: 'Well-paced and comprehensive',
    comment: 'I appreciate the logical progression from basics to advanced topics. The pace is perfect for working professionals. The community support is also a big plus.',
    helpful: 12,
  },
];

const RATING_DISTRIBUTION = [
  { stars: 5, count: 89, percentage: 62 },
  { stars: 4, count: 34, percentage: 24 },
  { stars: 3, count: 12, percentage: 8 },
  { stars: 2, count: 6, percentage: 4 },
  { stars: 1, count: 2, percentage: 2 },
];

export default function LearningPathDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: learningPath, isLoading, error } = useLearningPathBySlug(slug);
  const { isAuthenticated } = useAuth();
  const { data: relatedData, isLoading: relatedLoading } = useLearningPaths(
    learningPath
      ? { category: learningPath.category, limit: 6 }
      : undefined
  );
  const relatedPaths = (relatedData?.learningPaths || []).filter((p) => p.slug !== slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !learningPath) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-16 rounded-2xl border border-border/50 bg-card/50 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Learning Path Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The learning path you are looking for does not exist.
          </p>
          <Link href="/learning-paths">
            <Button>Browse Learning Paths</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/learning-paths" className="hover:text-primary transition-colors">Learning Paths</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{learningPath.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={difficultyColors[learningPath.difficulty] as 'success' | 'warning' | 'destructive'}>
                  {learningPath.difficulty}
                </Badge>
                <Badge variant="outline">{learningPath.category}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{learningPath.title}</h1>

              <p className="text-lg text-muted-foreground mb-6">{learningPath.shortDescription}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{learningPath.duration} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{learningPath.studentsCount} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span>{learningPath.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                    {learningPath.creator.avatar ? (
                      <img
                        src={learningPath.creator.avatar}
                        alt={learningPath.creator.name}
                        className="w-10 h-10 rounded-xl"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {learningPath.creator.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{learningPath.creator.name}</span>
                </div>
              </div>

              {learningPath.thumbnail && (
                <img
                  src={learningPath.thumbnail}
                  alt={learningPath.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
                />
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About this path</h2>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {learningPath.description}
                </p>
              </div>

              {learningPath.learningOutcomes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">What you will learn</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {learningPath.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-success/5 rounded-xl border border-success/10">
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                        <span className="text-sm">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {learningPath.requiredSkills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                  <div className="flex flex-wrap gap-2">
                    {learningPath.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {learningPath.tags.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {learningPath.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Start Learning</h3>
                
                {isAuthenticated ? (
                  <Button className="w-full gap-2" size="lg">
                    <BookOpen className="w-5 h-5" />
                    Enroll Now
                  </Button>
                ) : (
                  <Link href="/login" className="block">
                    <Button className="w-full gap-2" size="lg">
                      Sign In to Enroll
                    </Button>
                  </Link>
                )}

                <Button variant="outline" className="w-full gap-2 mt-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>

                <div className="border-t border-border/50 my-5" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{learningPath.duration} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className="font-medium capitalize">{learningPath.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{learningPath.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{learningPath.studentsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">{learningPath.rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {relatedPaths.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-2xl font-bold mb-6">Related Learning Paths</h2>
            {relatedLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden animate-pulse">
                    <div className="h-48 bg-muted/50" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 w-1/3 rounded bg-muted/50" />
                      <div className="h-6 w-2/3 rounded bg-muted/50" />
                      <div className="h-4 w-full rounded bg-muted/50" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedPaths.slice(0, 6).map((path) => (
                  <LearningPathCard key={path._id} learningPath={path} />
                ))}
              </div>
            )}
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2">{learningPath.rating.toFixed(1)}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < Math.round(learningPath.rating)
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground/30'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{learningPath.studentsCount} students enrolled</p>
                </div>

                <div className="space-y-2">
                  {RATING_DISTRIBUTION.map((item) => (
                    <div key={item.stars} className="flex items-center gap-2 text-sm">
                      <span className="w-8 text-right text-muted-foreground">{item.stars}★</span>
                      <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-warning rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-muted-foreground">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {PLACEHOLDER_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < review.rating
                              ? 'fill-warning text-warning'
                              : 'text-muted-foreground/30'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">{review.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.comment}</p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-center pt-4">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
