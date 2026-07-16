'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LifeBuoy, AlertCircle, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { StatCard } from '@/features/admin/components/StatCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const tickets = [
  { id: 1, subject: 'Cannot access premium content', user: 'John Doe', priority: 'high', status: 'open', created: '2h ago' },
  { id: 2, subject: 'Payment not processed', user: 'Jane Smith', priority: 'critical', status: 'pending', created: '4h ago' },
  { id: 3, subject: 'Course completion not saved', user: 'Bob Wilson', priority: 'medium', status: 'open', created: '1d ago' },
  { id: 4, subject: 'Feature request: Dark mode', user: 'Alice Brown', priority: 'low', status: 'resolved', created: '2d ago' },
  { id: 5, subject: 'OAuth login not working', user: 'Charlie Davis', priority: 'high', status: 'open', created: '3d ago' },
];

const priorityColors: Record<string, 'destructive' | 'warning' | 'info' | 'secondary'> = {
  critical: 'destructive',
  high: 'warning',
  medium: 'info',
  low: 'secondary',
};

export default function AdminSupportPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Support</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground mt-1 font-body">Manage customer support requests.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Open Tickets" value="12" icon={<LifeBuoy size={18} />} color="warning" />
        <StatCard title="In Progress" value="5" icon={<Clock size={18} />} color="info" />
        <StatCard title="Resolved" value="89" icon={<CheckCircle2 size={18} />} color="success" />
        <StatCard title="Avg Response" value="2.4h" icon={<MessageSquare size={18} />} color="primary" />
      </motion.div>

      <motion.div variants={item}>
        <Card variant="elevated" className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">#{ticket.id}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{ticket.user}</td>
                  <td className="px-6 py-4">
                    <Badge variant={priorityColors[ticket.priority]} size="sm" className="capitalize">
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={ticket.status === 'open' ? 'info' : ticket.status === 'resolved' ? 'success' : 'warning'} size="sm" className="capitalize">
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{ticket.created}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">Reply</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
