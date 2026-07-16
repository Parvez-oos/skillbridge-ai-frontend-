'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Send, Mail, Clock, Users, Plus } from 'lucide-react';
import { StatCard } from '@/features/admin/components/StatCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const notifications = [
  { id: 1, title: 'New user registered', message: 'A new user has joined the platform', type: 'system', sent: '2h ago', recipients: 'All users' },
  { id: 2, title: 'Course published', message: 'React Fundamentals is now live', type: 'broadcast', sent: '1d ago', recipients: 'Subscribers' },
  { id: 3, title: 'Scheduled: Maintenance', message: 'System maintenance on Sunday', type: 'scheduled', sent: 'Scheduled', recipients: 'All users' },
];

export default function AdminNotificationsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <span className="font-overline text-primary mb-2 block">Support</span>
          <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1 font-body">Manage push, email, and in-app notifications.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />}>New Notification</Button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Sent Today" value="24" icon={<Send size={18} />} color="primary" />
        <StatCard title="Email Sent" value="156" icon={<Mail size={18} />} color="info" />
        <StatCard title="Push Sent" value="89" icon={<Bell size={18} />} color="success" />
        <StatCard title="Scheduled" value="3" icon={<Clock size={18} />} color="warning" />
      </motion.div>

      <motion.div variants={item}>
        <Card variant="elevated" className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Notification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Sent</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={n.type === 'system' ? 'info' : n.type === 'broadcast' ? 'success' : 'warning'} size="sm" className="capitalize">
                      {n.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{n.recipients}</td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{n.sent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
