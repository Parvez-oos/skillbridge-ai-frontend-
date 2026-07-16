'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileBarChart, User, Shield, Settings, Trash2, Edit, Eye } from 'lucide-react';
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
  { id: 1, admin: 'Admin User', action: 'Updated user role', target: 'john@example.com', ip: '192.168.1.1', browser: 'Chrome 120', time: '2m ago' },
  { id: 2, admin: 'Admin User', action: 'Deleted blog post', target: 'React Guide', ip: '192.168.1.1', browser: 'Chrome 120', time: '15m ago' },
  { id: 3, admin: 'Admin User', action: 'Changed settings', target: 'SMTP Configuration', ip: '192.168.1.1', browser: 'Chrome 120', time: '1h ago' },
  { id: 4, admin: 'Admin User', action: 'Published learning path', target: 'Python Mastery', ip: '192.168.1.1', browser: 'Chrome 120', time: '2h ago' },
  { id: 5, admin: 'Admin User', action: 'Created coupon', target: 'SAVE20', ip: '192.168.1.1', browser: 'Chrome 120', time: '3h ago' },
];

const actionIcons: Record<string, React.ReactNode> = {
  'Updated user role': <User size={12} />,
  'Deleted blog post': <Trash2 size={12} />,
  'Changed settings': <Settings size={12} />,
  'Published learning path': <Eye size={12} />,
  'Created coupon': <Edit size={12} />,
};

export default function AdminAuditLogsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">System</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground mt-1 font-body">Track every admin action on the platform.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Actions" value="47" icon={<FileBarChart size={18} />} color="primary" />
        <StatCard title="Active Admins" value="3" icon={<Shield size={18} />} color="success" />
        <StatCard title="This Week" value="312" icon={<FileBarChart size={18} />} color="info" />
        <StatCard title="Suspicious" value="0" icon={<Shield size={18} />} color="success" />
      </motion.div>

      <motion.div variants={item}>
        <Card variant="elevated" className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Admin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">IP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Browser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{log.admin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      {actionIcons[log.action] || <FileBarChart size={12} />}
                      {log.action}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{log.target}</td>
                  <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{log.ip}</td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{log.browser}</td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
