'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/features/admin/components/DataTable';
import { StatCard } from '@/features/admin/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { FileText, Eye, Star, PenTool, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  difficulty: string;
  views: number;
  likes: number;
  isPublished: boolean;
  publishDate: string;
  author: { _id: string; name: string; email: string };
}

export default function AdminBlogPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'blog', page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.set('search', search);
      const res = await apiClient.get(`/blog/posts?${params.toString()}`);
      return res as { success: boolean; data: BlogPost[]; pagination: { page: number; limit: number; total: number; totalPages: number } };
    },
    staleTime: 30000,
  });

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (post) => (
        <div>
          <p className="text-sm font-medium">{post.title}</p>
          <p className="text-xs text-muted-foreground">{post.category}</p>
        </div>
      ),
    },
    {
      key: 'author',
      label: 'Author',
      render: (post) => <span className="text-sm">{post.author?.name ?? 'Unknown'}</span>,
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (post) => (
        <div className="flex flex-wrap gap-1">
          {post.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'views',
      label: 'Views',
      sortable: true,
      render: (post) => (
        <div className="flex items-center gap-1 text-sm">
          <Eye size={12} className="text-muted-foreground" />
          {post.views}
        </div>
      ),
    },
    {
      key: 'likes',
      label: 'Likes',
      sortable: true,
      render: (post) => (
        <div className="flex items-center gap-1 text-sm">
          <Star size={12} className="text-muted-foreground" />
          {post.likes}
        </div>
      ),
    },
    {
      key: 'isPublished',
      label: 'Status',
      render: (post) => (
        <Badge variant={post.isPublished ? 'success' : 'secondary'} size="sm">
          {post.isPublished ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'publishDate',
      label: 'Date',
      sortable: true,
      render: (post) => <span className="text-xs text-muted-foreground">{new Date(post.publishDate).toLocaleDateString()}</span>,
    },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Content</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Blog Management</h1>
        <p className="text-muted-foreground mt-1 font-body">Manage all blog posts and articles.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Posts" value={data?.pagination?.total ?? 0} icon={<FileText size={18} />} color="primary" />
        <StatCard title="Total Views" value={data?.data?.reduce((s, p) => s + p.views, 0) ?? 0} icon={<Eye size={18} />} color="info" />
        <StatCard title="Total Likes" value={data?.data?.reduce((s, p) => s + p.likes, 0) ?? 0} icon={<Star size={18} />} color="warning" />
      </motion.div>

      <motion.div variants={item}>
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          totalPages={data?.pagination?.totalPages ?? 1}
          currentPage={page}
          onPageChange={setPage}
          searchable
          searchPlaceholder="Search blog posts..."
          onSearch={(q) => { setSearch(q); setPage(1); }}
          loading={isLoading}
          actions={(post) => [
            { label: 'View', icon: <Eye size={12} />, onClick: () => {} },
            { label: 'Edit', icon: <PenTool size={12} />, onClick: () => {} },
            { label: 'Delete', icon: <PenTool size={12} />, onClick: () => toast.success('Deleted'), variant: 'destructive' },
          ]}
          emptyMessage="No blog posts found"
        />
      </motion.div>
    </motion.div>
  );
}
