'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye, Heart } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20">
          <div className="relative h-64 sm:h-80">
            <Image
              src={post.coverImage || post.featuredImage || '/images/blog-default.jpg'}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${difficultyColors[post.difficulty]}`}>
                  {post.difficulty}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-bold leading-tight group-hover:text-primary-foreground/80 transition-colors">
                {post.title}
              </h2>
              <p className="mb-3 text-sm text-white/90 line-clamp-2">
                {post.subtitle || post.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.publishDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {post.views.toLocaleString()} views
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/20 group-hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.thumbnail || post.coverImage || '/images/blog-default.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${difficultyColors[post.difficulty]}`}>
              {post.difficulty}
            </span>
          </div>
          {post.featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2">
            <span className="text-xs font-semibold text-primary">
              {post.category}
            </span>
          </div>
          
          <h3 className="mb-2 text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>
          
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.summary}
          </p>
          
          <div className="mt-auto flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg border border-border/50 bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center rounded-lg border border-border/50 bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={28}
                    height={28}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-xs font-semibold text-white">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-foreground">
                {post.author.name}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                {post.likes}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
