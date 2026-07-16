'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminUsers, useUpdateUserRole, useDeleteUser } from '@/features/admin/hooks/useAdmin';
import { DataTable, Column } from '@/features/admin/components/DataTable';
import { StatCard } from '@/features/admin/components/StatCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminUser } from '@/features/admin/types';
import { Users, UserCheck, Crown, Download, Trash2, Edit, Eye, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading } = useAdminUsers({ page, limit: 10, search, role: roleFilter, sortBy, sortOrder });
  const updateRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole.mutateAsync({ userId, role: newRole });
      toast.success('User role updated');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser.mutateAsync(userId);
      toast.success('User deleted');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-xs text-primary">
              {user.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (user) => (
        <Badge variant={user.role === 'admin' ? 'gradient' : 'secondary'} size="sm">
          {user.role === 'admin' && <Shield size={10} className="mr-1" />}
          {user.role}
        </Badge>
      ),
    },
    {
      key: 'provider',
      label: 'Provider',
      render: (user) => (
        <Badge variant="outline" size="sm" className="capitalize">
          {user.provider}
        </Badge>
      ),
    },
    {
      key: 'isEmailVerified',
      label: 'Verified',
      render: (user) => (
        <Badge variant={user.isEmailVerified ? 'success' : 'warning'} size="sm">
          {user.isEmailVerified ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (user) => (
        <span className="text-xs text-muted-foreground">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Management</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">User Management</h1>
        <p className="text-muted-foreground mt-1 font-body">Manage all registered users on the platform.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Users" value={data?.pagination?.total ?? 0} icon={<Users size={18} />} color="primary" />
        <StatCard title="Admins" value={data?.data?.filter((u) => u.role === 'admin').length ?? 0} icon={<Crown size={18} />} color="warning" />
        <StatCard title="Regular Users" value={data?.data?.filter((u) => u.role === 'user').length ?? 0} icon={<UserCheck size={18} />} color="success" />
      </motion.div>

      <motion.div variants={item}>
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          totalPages={data?.pagination?.totalPages ?? 1}
          currentPage={page}
          onPageChange={setPage}
          onSort={(key, order) => { setSortBy(key); setSortOrder(order); }}
          sortBy={sortBy}
          sortOrder={sortOrder}
          searchable
          searchPlaceholder="Search users by name or email..."
          onSearch={(q) => { setSearch(q); setPage(1); }}
          loading={isLoading}
          actions={(user) => [
            { label: 'View', icon: <Eye size={12} />, onClick: () => {} },
            { label: user.role === 'admin' ? 'Demote to User' : 'Promote to Admin', icon: <Shield size={12} />, onClick: () => handleRoleChange(user._id, user.role === 'admin' ? 'user' : 'admin') },
            { label: 'Delete', icon: <Trash2 size={12} />, onClick: () => handleDelete(user._id), variant: 'destructive' },
          ]}
          emptyMessage="No users found"
        />
      </motion.div>
    </motion.div>
  );
}
