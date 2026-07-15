'use client';

import { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogFilterProps {
  categories: string[];
  tags: string[];
  selectedCategory?: string;
  selectedTag?: string;
  selectedDifficulty?: string;
  onCategoryChange: (category: string | undefined) => void;
  onTagChange: (tag: string | undefined) => void;
  onDifficultyChange: (difficulty: string | undefined) => void;
}

export function BlogFilter({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  selectedDifficulty,
  onCategoryChange,
  onTagChange,
  onDifficultyChange,
}: BlogFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters = selectedCategory || selectedTag || selectedDifficulty;

  const clearAllFilters = () => {
    onCategoryChange(undefined);
    onTagChange(undefined);
    onDifficultyChange(undefined);
  };

  const selectClass =
    'w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/40';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200',
            'border-border bg-card text-foreground shadow-sm',
            'hover:border-primary/40 hover:bg-muted/50 hover:shadow-md',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
            isFilterOpen && 'border-primary/50 bg-primary/5 text-primary shadow-md'
          )}
          aria-expanded={isFilterOpen}
          aria-controls="blog-filter-panel"
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isFilterOpen && 'rotate-180'
            )}
          />
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3.5 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary/15 hover:shadow-sm"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}

        {selectedCategory && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {selectedCategory}
            <button
              onClick={() => onCategoryChange(undefined)}
              className="ml-0.5 transition-colors hover:text-primary/70"
              aria-label={`Remove category filter: ${selectedCategory}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        )}

        {selectedTag && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent-foreground">
            #{selectedTag}
            <button
              onClick={() => onTagChange(undefined)}
              className="ml-0.5 transition-colors hover:opacity-70"
              aria-label={`Remove tag filter: ${selectedTag}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        )}

        {selectedDifficulty && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-sm font-medium text-success">
            {selectedDifficulty}
            <button
              onClick={() => onDifficultyChange(undefined)}
              className="ml-0.5 transition-colors hover:opacity-70"
              aria-label={`Remove difficulty filter: ${selectedDifficulty}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        )}
      </div>

      {isFilterOpen && (
        <div
          id="blog-filter-panel"
          role="region"
          aria-label="Blog filters"
          className="rounded-2xl border border-border bg-card p-5 shadow-lg"
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Category
              </label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => onCategoryChange(e.target.value || undefined)}
                className={selectClass}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Difficulty
              </label>
              <select
                value={selectedDifficulty || ''}
                onChange={(e) => onDifficultyChange(e.target.value || undefined)}
                className={selectClass}
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tags
              </label>
              <select
                value={selectedTag || ''}
                onChange={(e) => onTagChange(e.target.value || undefined)}
                className={selectClass}
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
