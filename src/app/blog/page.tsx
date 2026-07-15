'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { BlogSearch } from '@/features/blog/components/BlogSearch';
import { BlogFilter } from '@/features/blog/components/BlogFilter';
import { BlogPagination } from '@/features/blog/components/BlogPagination';
import { BlogListSkeleton } from '@/features/blog/components/BlogSkeleton';
import {
  useBlogPosts,
  useBlogCategories,
  useBlogTags,
} from '@/features/blog/hooks/useBlog';
import { Newsletter } from '@/components/sections/Newsletter';
import { ArrowUpDown, FileText } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'popular' | 'trending';

const SORT_OPTIONS: { value: SortOption; label: string; sortBy: string; sortOrder: string }[] = [
  { value: 'newest', label: 'Newest First', sortBy: 'publishDate', sortOrder: 'desc' },
  { value: 'oldest', label: 'Oldest First', sortBy: 'publishDate', sortOrder: 'asc' },
  { value: 'popular', label: 'Most Popular', sortBy: 'views', sortOrder: 'desc' },
  { value: 'trending', label: 'Most Liked', sortBy: 'likes', sortOrder: 'desc' },
];

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    searchParams.get('category') || undefined
  );
  const [selectedTag, setSelectedTag] = useState<string | undefined>(
    searchParams.get('tag') || undefined
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(
    searchParams.get('difficulty') || undefined
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'newest'
  );

  const sortConfig = SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[0];

  const updateURL = useCallback(
    (params: Record<string, string | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });
      router.push(`/blog?${newSearchParams.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const { data: blogData, isLoading } = useBlogPosts({
    page: currentPage,
    limit: 8,
    search: searchQuery || undefined,
    category: selectedCategory,
    tag: selectedTag,
    difficulty: selectedDifficulty as 'beginner' | 'intermediate' | 'advanced' | undefined,
    sortBy: sortConfig.sortBy as 'publishDate' | 'views' | 'likes' | 'readingTime' | 'createdAt',
    sortOrder: sortConfig.sortOrder as 'asc' | 'desc',
  });

  const { data: categories = [] } = useBlogCategories();
  const { data: tags = [] } = useBlogTags();

  useEffect(() => {
    updateURL({
      q: searchQuery || undefined,
      category: selectedCategory,
      tag: selectedTag,
      difficulty: selectedDifficulty,
      page: currentPage > 1 ? String(currentPage) : undefined,
      sort: sortBy !== 'newest' ? sortBy : undefined,
    });
  }, [searchQuery, selectedCategory, selectedTag, selectedDifficulty, currentPage, sortBy, updateURL]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | undefined) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleTagChange = useCallback((tag: string | undefined) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  }, []);

  const handleDifficultyChange = useCallback((difficulty: string | undefined) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  }, []);

  const posts = blogData?.posts || [];
  const totalPages = blogData?.totalPages || 0;
  const totalPosts = blogData?.total || 0;

  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-overline text-primary mb-3 block">Blog</span>
            <h1 className="mb-4 text-4xl md:text-5xl font-heading tracking-tight text-foreground">
              AI Learning Blog
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed font-body">
              Insights, tutorials, and guides to help you master artificial intelligence
              and advance your career.
            </p>

            <BlogSearch onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container>
          <div className="mb-8">
            <BlogFilter
              categories={categories}
              tags={tags}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              selectedDifficulty={selectedDifficulty}
              onCategoryChange={handleCategoryChange}
              onTagChange={handleTagChange}
              onDifficultyChange={handleDifficultyChange}
            />
          </div>

          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              {totalPosts} {totalPosts === 1 ? 'article' : 'articles'} found
            </p>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
            <BlogListSkeleton />
          ) : posts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground font-heading">
                No articles found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto font-body">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              <div className="mt-12">
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </Container>
      </Section>

      <Newsletter />
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogContent />
    </Suspense>
  );
}
