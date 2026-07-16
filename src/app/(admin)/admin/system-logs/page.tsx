'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Activity, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { StatCard } from '@/features/admin/components/StatCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const logs = [
  { id: 1, level: 'info', message: 'Server started on port 5000', source: 'server', time: '2024-01-15 10:00:00' },
  { id: 2, level: 'info', message: 'MongoDB connected successfully', source: 'database', time: '2024-01-15 10:00:01' },
  { id: 3, level: 'warn', message: 'Rate limit exceeded for IP 192.168.1.100', source: 'auth', time: '2024-01-15 10:05:32' },
  { id: 4, level: 'error', message: 'Failed to send email to user@example.com', source: 'email', time: '2024-01-15 10:12:45' },
  { id: 5, level: 'info', message: 'New user registered: john@example.com', source: 'auth', time: '2024-01-15 10:15:00' },
  { id: 6, level: 'warn', message: 'JWT token expired for user 507f1f77bcf86cd799439011', source: 'auth', time: '2024-01-15 10:20:00' },
  { id: 7, level: 'info', message: 'Blog post published: React Guide', source: 'blog', time: '2024-01-15 10:25:00' },
];

const levelConfig: Record<string, { icon: React.ReactNode; variant: 'success' | 'warning' | 'destructive' | 'info' }> = {
  info: { icon: <Info size={12} />, variant: 'info' },
  warn: { icon: <AlertTriangle size={12} />, variant: 'warning' },
  error: { icon: <XCircle size={12} />, variant: 'destructive' },
};

export default function AdminSystemLogsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">System</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">System Logs</h1>
        <p className="text-muted-foreground mt-1 font-body">API, authentication, server, and database logs.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="API Requests" value="1,247" icon={<Activity size={18} />} color="primary" />
        <StatCard title="Errors" value="3" icon={<XCircle size={18} />} color="destructive" />
        <StatCard title="Warnings" value="12" icon={<AlertTriangle size={18} />} color="warning" />
        <StatCard title="Uptime" value="99.9%" icon={<CheckCircle2 size={18} />} color="success" />
      </motion.div>

      <motion.div variants={item}>
        <Card variant="elevated" className="overflow-hidden">
          <div className="border-b border-border/50 p-4">
            <div className="flex items-center gap-2">
              <Badge variant="info" size="sm">All</Badge>
              <Badge variant="success" size="sm">Info</Badge>
              <Badge variant="warning" size="sm">Warnings</Badge>
              <Badge variant="destructive" size="sm">Errors</Badge>
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {logs.map((log) => {
              const config = levelConfig[log.level];
              return (
                <div key={log.id} className="flex items-start gap-4 px-6 py-3 hover:bg-muted/30 transition-colors">
                  <Badge variant={config.variant} size="sm" className="mt-0.5 shrink-0">
                    {config.icon}
                    <span className="ml-1">{log.level}</span>
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{log.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{log.source} - {log.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
