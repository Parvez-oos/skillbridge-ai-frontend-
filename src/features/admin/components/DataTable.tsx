'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Trash2, Edit, Eye } from 'lucide-react';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  actions?: (item: T) => { label: string; icon?: React.ReactNode; onClick: () => void; variant?: 'default' | 'destructive' }[];
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
}

export function DataTable<T extends { _id: string }>({
  columns,
  data,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  onSort,
  sortBy,
  sortOrder = 'asc',
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  selectable = false,
  onSelectionChange,
  actions,
  emptyMessage = 'No data found',
  loading = false,
  className,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const allSelected = data.length > 0 && data.every((item) => selectedIds.has(item._id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      onSelectionChange?.([]);
    } else {
      const newSet = new Set(data.map((item) => item._id));
      setSelectedIds(newSet);
      onSelectionChange?.(data.filter((item) => newSet.has(item._id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
    onSelectionChange?.(data.filter((item) => newSet.has(item._id)));
  };

  const handleSort = (key: string) => {
    if (!onSort) return;
    const newOrder = sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(key, newOrder);
  };

  return (
    <Card variant="elevated" className={cn('overflow-hidden', className)}>
      {searchable && (
        <div className="border-b border-border/50 p-4">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="h-9 pl-9 text-xs"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-muted-foreground',
                    col.sortable && 'cursor-pointer select-none hover:text-foreground',
                    col.className
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortBy === col.key && (
                      sortOrder === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="w-12 px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border/30">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted/50" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  className={cn(
                    'border-b border-border/30 transition-colors hover:bg-muted/30',
                    selectedIds.has(item._id) && 'bg-primary/5'
                  )}
                >
                  {selectable && (
                    <td className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item._id)}
                        onChange={() => handleSelectOne(item._id)}
                        className="h-4 w-4 rounded border-border accent-primary"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3 text-sm', col.className)}>
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="w-12 px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={() => setOpenActionId(openActionId === item._id ? null : item._id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                        {openActionId === item._id && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-xl border border-border/50 bg-card p-1 shadow-xl">
                            {actions(item).map((action, i) => (
                              <button
                                key={i}
                                onClick={() => { action.onClick(); setOpenActionId(null); }}
                                className={cn(
                                  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors',
                                  action.variant === 'destructive'
                                    ? 'text-destructive hover:bg-destructive/10'
                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                )}
                              >
                                {action.icon}
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/50 px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => onPageChange?.(currentPage - 1)}
            >
              <ChevronLeft size={14} />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage + i - 2;
              if (page < 1 || page > totalPages) return null;
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
