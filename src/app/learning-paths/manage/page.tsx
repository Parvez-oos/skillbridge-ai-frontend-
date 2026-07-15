'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useMyLearningPaths, useDeleteLearningPath } from '@/features/learning-path/hooks/useLearningPath';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'destructive',
} as const;

function ManageLearningPathsContent() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useMyLearningPaths(page, limit);
  const deleteMutation = useDeleteLearningPath();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive">Failed to load learning paths</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Learning Paths</h2>
        <Link href="/learning-paths/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create New
          </Button>
        </Link>
      </div>

      {(!data?.learningPaths || data.learningPaths.length === 0) ? (
        <div className="text-center py-12 rounded-xl border border-border bg-card">
          <p className="text-muted-foreground mb-4">You have not created any learning paths yet.</p>
          <Link href="/learning-paths/create">
            <Button>Create Your First Path</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Difficulty</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Students</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(data?.learningPaths ?? []).map((lp) => (
                  <tr key={lp._id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{lp.title}</div>
                      <div className="text-sm text-muted-foreground">{lp.duration}h</div>
                    </td>
                    <td className="p-4">{lp.category}</td>
                    <td className="p-4">
                      <Badge variant={difficultyColors[lp.difficulty] as 'success' | 'warning' | 'destructive'} size="sm">
                        {lp.difficulty}
                      </Badge>
                    </td>
                    <td className="p-4">{lp.studentsCount}</td>
                    <td className="p-4">
                      {lp.isPublished ? (
                        <Badge variant="success" size="sm" className="gap-1">
                          <Eye className="w-3 h-3" /> Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary" size="sm" className="gap-1">
                          <EyeOff className="w-3 h-3" /> Draft
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Link
                          href={`/learning-paths/${lp.slug}`}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/learning-paths/${lp._id}/edit`}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(lp._id)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data && data.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="ghost"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="px-4 py-2 text-sm text-muted-foreground">
                Page {page} of {data.totalPages}
              </span>
              <Button
                variant="ghost"
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-desc">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} aria-hidden="true" />
          <div className="relative bg-card rounded-xl border border-border p-6 shadow-2xl max-w-md w-full mx-4">
            <h3 id="delete-dialog-title" className="font-bold text-lg mb-2">Delete Learning Path</h3>
            <p id="delete-dialog-desc" className="text-muted-foreground mb-6">
              Are you sure you want to delete this learning path? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                loading={deleteMutation.isPending}
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManageLearningPathsPage() {
  return (
    <ProtectedRoute>
      <Section className="pt-24 md:pt-32">
        <Container>
          <ManageLearningPathsContent />
        </Container>
      </Section>
    </ProtectedRoute>
  );
}
