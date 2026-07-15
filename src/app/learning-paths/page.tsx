'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { LearningPathCard } from '@/features/learning-path/components/LearningPathCard';
import { useLearningPaths, useCategories } from '@/features/learning-path/hooks/useLearningPath';
import { LearningPathQueryParams } from '@/features/learning-path/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, ChevronLeft, ChevronRight, Sparkles, ArrowUpDown } from 'lucide-react';

export default function LearningPathsPage() {
  const [query, setQuery] = useState<LearningPathQueryParams>({
    page: 1,
    limit: 9,
  });
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'rating' | 'studentsCount' | 'title'>('createdAt');

  const SORT_OPTIONS = [
    { value: 'createdAt' as const, label: 'Newest' },
    { value: 'rating' as const, label: 'Highest Rated' },
    { value: 'studentsCount' as const, label: 'Most Popular' },
    { value: 'title' as const, label: 'A-Z' },
  ];

  const { data, isLoading, error } = useLearningPaths({
    ...query,
    sortBy,
    sortOrder: sortBy === 'title' ? 'asc' : 'desc',
  });
  const { data: categories } = useCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handleCategoryChange = (category: string) => {
    setQuery((prev) => ({
      ...prev,
      category: prev.category === category ? undefined : category,
      page: 1,
    }));
  };

  const handleDifficultyChange = (difficulty: string) => {
    setQuery((prev) => ({
      ...prev,
      difficulty: prev.difficulty === difficulty ? undefined : (difficulty as 'beginner' | 'intermediate' | 'advanced'),
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as typeof sortBy);
    setQuery((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Paths
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Explore Learning Paths</h1>
            <p className="text-lg text-muted-foreground">
              Discover personalized learning paths to advance your career.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10"
                  />
                </form>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Difficulty
                  </h3>
                  <div className="space-y-1.5">
                    {['beginner', 'intermediate', 'advanced'].map((diff) => (
                      <button
                        key={diff}
                        onClick={() => handleDifficultyChange(diff)}
                        className={`w-full px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                          query.difficulty === diff
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-border/30'
                        }`}
                      >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {categories && categories.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-1.5">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`w-full px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                            query.category === category
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-border/30'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            <main className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {data?.total || 0} {data?.total === 1 ? 'path' : 'paths'} found
                </p>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="rounded-xl border border-border bg-muted/30 px-3 py-1.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
                      <Skeleton className="h-48" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-4 w-1/3 rounded-lg" />
                        <Skeleton className="h-6 w-2/3 rounded-lg" />
                        <Skeleton className="h-4 w-full rounded-lg" />
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-16 rounded-lg" />
                          <Skeleton className="h-4 w-16 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-16 rounded-2xl border border-border/50 bg-card/50">
                  <p className="text-destructive">Failed to load learning paths. Please try again.</p>
                </div>
              ) : !data?.learningPaths?.length ? (
                <div className="text-center py-16 rounded-2xl border border-border/50 bg-card/50">
                  <p className="text-muted-foreground">No learning paths found.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {data?.learningPaths?.map((lp) => (
                      <LearningPathCard key={lp._id} learningPath={lp} />
                    ))}
                  </div>

                  {data && data.totalPages && data.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageChange(query.page! - 1)}
                        disabled={query.page === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={query.page === page ? 'default' : 'ghost'}
                          size="icon"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageChange(query.page! + 1)}
                        disabled={query.page === data.totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </Container>
      </Section>
    </div>
  );
}
