'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (showEllipsisStart) {
      pages.push(1);
      pages.push('...');
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (showEllipsisEnd) {
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const buttonBase = 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonBase}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      <ul className="flex items-center gap-1" role="list">
        {getPageNumbers().map((page, index) => (
          <li key={`page-${index}`} role="listitem">
            {typeof page === 'number' ? (
              <button
                onClick={() => onPageChange(page)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : `${buttonBase}`
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span className="inline-flex h-10 w-10 items-center justify-center text-muted-foreground" aria-hidden="true">
                ...
              </span>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonBase}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
