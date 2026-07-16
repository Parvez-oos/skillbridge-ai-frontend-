'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable, Column } from '@/features/admin/components/DataTable';
import { StatCard } from '@/features/admin/components/StatCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { GraduationCap, Users, Star, Clock, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

interface LearningPath {
  _id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  duration: number;
  rating: number;
  studentsCount: number;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminLearningPathsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'learning-paths', page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.set('search', search);
      const res = await apiClient.get(`/learning-paths?${params.toString()}`);
      return res as { success: boolean; data: LearningPath[]; pagination: { page: number; limit: number; total: number; totalPages: number } };
    },
    staleTime: 30000,
  });

  const columns: Column<LearningPath>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (lp) => (
        <div>
          <p className="text-sm font-medium">{lp.title}</p>
          <p className="text-xs text-muted-foreground">{lp.category}</p>
        </div>
      ),
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      render: (lp) => (
        <Badge
          variant={lp.difficulty === 'advanced' ? 'destructive' : lp.difficulty === 'intermediate' ? 'warning' : 'success'}
          size="sm"
        >
          {lp.difficulty}
        </Badge>
      ),
    },
    { key: 'duration', label: 'Duration', render: (lp) => <span className="text-sm">{lp.duration}h</span> },
    {
      key: 'studentsCount',
      label: 'Students',
      sortable: true,
      render: (lp) => <span className="text-sm">{lp.studentsCount}</span>,
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (lp) => (
        <div className="flex items-center gap-1">
          <Star size={12} className="text-warning fill-warning" />
          <span className="text-sm">{lp.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      key: 'isPublished',
      label: 'Status',
      render: (lp) => (
        <Badge variant={lp.isPublished ? 'success' : 'secondary'} size="sm">
          {lp.isPublished ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (lp) => <span className="text-xs text-muted-foreground">{new Date(lp.createdAt).toLocaleDateString()}</span>,
    },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Management</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Learning Paths</h1>
        <p className="text-muted-foreground mt-1 font-body">Manage all learning paths on the platform.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Paths" value={data?.pagination?.total ?? 0} icon={<GraduationCap size={18} />} color="primary" />
        <StatCard title="Total Students" value={data?.data?.reduce((s, lp) => s + lp.studentsCount, 0) ?? 0} icon={<Users size={18} />} color="success" />
        <StatCard title="Avg Rating" value={data?.data?.length ? (data.data.reduce((s, lp) => s + lp.rating, 0) / data.data.length).toFixed(1) : '0.0'} icon={<Star size={18} />} color="warning" />
      </motion.div>

      <motion.div variants={item}>
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          totalPages={data?.pagination?.totalPages ?? 1}
          currentPage={page}
          onPageChange={setPage}
          searchable
          searchPlaceholder="Search learning paths..."
          onSearch={(q) => { setSearch(q); setPage(1); }}
          loading={isLoading}
          actions={(lp) => [
            { label: 'View', icon: <GraduationCap size={12} />, onClick: () => {} },
            { label: 'Edit', icon: <GraduationCap size={12} />, onClick: () => {} },
            { label: 'Delete', icon: <GraduationCap size={12} />, onClick: () => toast.success('Deleted'), variant: 'destructive' },
          ]}
          emptyMessage="No learning paths found"
        />
      </motion.div>
    </motion.div>
  );
}
