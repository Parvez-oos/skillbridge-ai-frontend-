'use client';

import { motion } from 'framer-motion';
import { useAdminDashboard } from '@/features/admin/hooks/useAdmin';
import { StatCard } from '@/features/admin/components/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Users, UserCheck, Crown, BookOpen, GraduationCap,
  Award, FileText, Star, TrendingUp, Eye, ArrowUpRight,
  Plus, Send, Tag, FileBarChart, Zap
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const COLORS = ['#6366F1', '#22C55E', '#EAB308', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonth(monthData: { _id: { year: number; month: number } }) {
  return MONTH_NAMES[monthData._id.month - 1] || '';
}

export default function AdminDashboardPage() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-xl" />
          <Skeleton className="h-4 w-72 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const charts = data?.charts;
  const recent = data?.recent;

  const userChartData = charts?.usersByMonth?.map((d) => ({
    name: formatMonth(d),
    users: d.count || 0,
  })) || [];

  const blogChartData = charts?.blogViewsByMonth?.map((d) => ({
    name: formatMonth(d),
    views: d.views || 0,
    posts: d.count || 0,
  })) || [];

  const categoryData = charts?.categoryDistribution?.map((d, i) => ({
    name: d._id,
    value: d.count,
    fill: COLORS[i % COLORS.length],
  })) || [];

  const difficultyData = charts?.difficultyDistribution?.map((d) => ({
    name: d._id,
    count: d.count,
  })) || [];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Admin Overview</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1 font-body">Welcome back. Here&apos;s what&apos;s happening with your platform.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats?.totalUsers ?? 0} icon={<Users size={18} />} color="primary" />
        <StatCard title="Active Users" value={stats?.activeUsers ?? 0} icon={<UserCheck size={18} />} color="success" />
        <StatCard title="Blog Posts" value={stats?.totalBlogPosts ?? 0} icon={<FileText size={18} />} color="info" />
        <StatCard title="Learning Paths" value={stats?.totalLearningPaths ?? 0} icon={<GraduationCap size={18} />} color="warning" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Views" value={stats?.totalBlogViews ?? 0} icon={<Eye size={18} />} color="info" />
        <StatCard title="Total Likes" value={stats?.totalLikes ?? 0} icon={<Star size={18} />} color="warning" />
        <StatCard title="Total Students" value={stats?.totalStudents ?? 0} icon={<Award size={18} />} color="success" />
        <StatCard title="Published" value={stats?.publishedLearningPaths ?? 0} icon={<TrendingUp size={18} />} color="primary" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">User Growth</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userChartData}>
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#6366F1" fill="url(#userGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">Blog Views</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={blogChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="views" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ color: 'var(--foreground)', fontSize: '11px' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">Difficulty Levels</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={difficultyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#22C55E" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {[
                { label: 'Add Course', icon: <Plus size={14} />, color: 'text-primary' },
                { label: 'Create Learning Path', icon: <GraduationCap size={14} />, color: 'text-success' },
                { label: 'Publish Blog', icon: <FileText size={14} />, color: 'text-info' },
                { label: 'Send Notification', icon: <Send size={14} />, color: 'text-warning' },
                { label: 'Create Coupon', icon: <Tag size={14} />, color: 'text-destructive' },
                { label: 'Generate Report', icon: <FileBarChart size={14} />, color: 'text-primary' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                >
                  <span className={action.color}>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Recent Users</CardTitle>
              <a href="/admin/users" className="flex items-center gap-1 text-xs text-primary hover:underline">
                View all <ArrowUpRight size={12} />
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              {recent?.users?.map((user) => (
                <div key={user._id} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/30">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-xs text-primary">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge variant="ghost" size="sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Recent Blog Posts</CardTitle>
              <a href="/admin/blog" className="flex items-center gap-1 text-xs text-primary hover:underline">
                View all <ArrowUpRight size={12} />
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              {recent?.blogPosts?.map((post) => (
                <div key={post._id} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/30">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <FileText size={14} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{post.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{post.category}</p>
                  </div>
                  <Badge variant={post.isPublished ? 'success' : 'secondary'} size="sm">
                    {post.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
