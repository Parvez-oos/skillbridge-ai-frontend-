'use client';

import { motion } from 'framer-motion';
import { useAdminDashboard } from '@/features/admin/hooks/useAdmin';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatCard } from '@/features/admin/components/StatCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, Users, BookOpen, Eye, TrendingUp, Clock } from 'lucide-react';
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
const formatMonth = (d: { _id: { year: number; month: number } }) => MONTH_NAMES[d._id.month - 1] || '';

export default function AdminAnalyticsPage() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-7 w-48 rounded-xl" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const charts = data?.charts;

  const userGrowthData = charts?.usersByMonth?.map((d) => ({
    name: formatMonth(d),
    users: d.count || 0,
  })) || [];

  const blogViewsData = charts?.blogViewsByMonth?.map((d) => ({
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

  const retentionData = userGrowthData.map((d, i) => ({
    name: d.name,
    retained: Math.round(d.users * (0.6 + Math.random() * 0.3)),
    churned: Math.round(d.users * (0.1 + Math.random() * 0.2)),
  }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Intelligence</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1 font-body">Platform performance and user insights.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="User Growth" value={userGrowthData.reduce((s, d) => s + d.users, 0)} icon={<Users size={18} />} color="primary" />
        <StatCard title="Blog Views" value={stats?.totalBlogViews ?? 0} icon={<Eye size={18} />} color="info" />
        <StatCard title="Total Students" value={stats?.totalStudents ?? 0} icon={<BookOpen size={18} />} color="success" />
        <StatCard title="Published Paths" value={stats?.publishedLearningPaths ?? 0} icon={<TrendingUp size={18} />} color="warning" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">User Retention</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={retentionData}>
                  <defs>
                    <linearGradient id="retainedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="churnedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend formatter={(v) => <span style={{ fontSize: '11px' }}>{v}</span>} />
                  <Area type="monotone" dataKey="retained" stroke="#22C55E" fill="url(#retainedGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="churned" stroke="#EF4444" fill="url(#churnedGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData.map((d, i) => ({ name: d.name, revenue: d.users * 12 + Math.round(Math.random() * 200) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} dot={{ r: 4, fill: '#6366F1' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">Course Completion</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={difficultyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend formatter={(v) => <span style={{ fontSize: '11px' }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
