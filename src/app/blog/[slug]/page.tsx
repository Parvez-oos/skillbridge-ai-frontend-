'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { BlogDetailSkeleton } from '@/features/blog/components/BlogSkeleton';
import { TableOfContents } from '@/features/blog/components/TableOfContents';
import { useBlogPostBySlug, useRelatedPosts } from '@/features/blog/hooks/useBlog';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Calendar, Clock, Eye, Heart, ArrowLeft, Share2, BookmarkPlus, Bookmark, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const difficultyColors = {
  beginner: 'bg-success/10 text-success border border-success/20',
  intermediate: 'bg-warning/10 text-warning border border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border border-destructive/20',
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: post, isLoading, error } = useBlogPostBySlug(slug);
  const { data: relatedPosts = [] } = useRelatedPosts(post?._id || '', 3);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeTocId, setActiveTocId] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollTop > 500);

      // Find active TOC item
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
      let currentId = '';
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentId = heading.id;
        }
      });
      setActiveTocId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post?.title,
        text: post?.summary,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    toast.success('Article saved successfully.');
  };

  if (isLoading) {
    return (
      <div className="pt-24 md:pt-32">
        <Container>
          <BlogDetailSkeleton />
        </Container>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-24 md:pt-32">
        <Container>
          <div className="py-16 text-center rounded-2xl border border-border/50 bg-card/50 max-w-md mx-auto">
            <h1 className="mb-4 text-3xl font-bold text-foreground">
              Article Not Found
            </h1>
            <p className="mb-8 text-muted-foreground">
              The article you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Bookmark className="h-6 w-6 text-primary" />
            </div>
            <AlertDialogTitle>Sign in required</AlertDialogTitle>
            <AlertDialogDescription>
              Please sign in to save this article to your personal collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/login')}>
              Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Container>
        <article className="mx-auto max-w-4xl">
          <header className="mb-8">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={cn('inline-flex items-center rounded-xl px-3 py-1 text-xs font-medium', difficultyColors[post.difficulty])}>
                {post.difficulty}
              </span>
              <span className="inline-flex items-center rounded-xl bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mb-6 text-xl text-muted-foreground">
                {post.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 border-b border-border/50 pb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-xl bg-muted">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-medium text-muted-foreground">
                      {post.author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {post.author.name}
                  </p>
                  {post.author.bio && (
                    <p className="text-sm text-muted-foreground">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {post.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4" />
                  {post.likes.toLocaleString()} likes
                </span>
              </div>
            </div>
          </header>

          {(post.coverImage || post.featuredImage) && (
            <div className="relative mb-8 h-64 overflow-hidden rounded-2xl sm:h-96">
              <Image
                src={post.coverImage || post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
          )}

          {/* Mobile TOC */}
          <TableOfContents items={post.tableOfContents} activeId={activeTocId} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop/Tablet sidebar: TOC + Share/Save */}
            <aside className="hidden md:block lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    On This Page
                  </h3>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-0.5" role="list">
                      {post.tableOfContents.map((item) => {
                        const isActive = activeTocId === item.id;
                        return (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }}
                              className={cn(
                                'group relative block rounded-lg text-[14px] leading-[1.6] font-medium tracking-wide transition-all duration-200 ease-out',
                                item.level === 3 ? 'pl-7' : 'pl-4',
                                'py-2 pr-3',
                                isActive
                                  ? 'text-primary bg-primary/8 font-semibold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                              )}
                              aria-current={isActive ? 'location' : undefined}
                            >
                              <span
                                className={cn(
                                  'absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full transition-all duration-250 ease-out',
                                  isActive
                                    ? 'bg-primary opacity-100 scale-y-100'
                                    : 'bg-transparent opacity-0 scale-y-50'
                                )}
                              />
                              <span className="relative z-10">{item.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted/50 hover:shadow-sm"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted/50 hover:shadow-sm"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </aside>

            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="inline-flex items-center rounded-xl border border-border bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/80 hover:border-primary/30 hover:text-foreground"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-border/50 pt-12">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Related Articles
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </Container>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
