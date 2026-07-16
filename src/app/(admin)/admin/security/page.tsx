'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Lock, UserX, Activity, Globe, Clock, Ban } from 'lucide-react';
import { StatCard } from '@/features/admin/components/StatCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const failedLogins = [
  { id: 1, email: 'admin@example.com', ip: '192.168.1.100', attempts: 5, lastAttempt: '2m ago', status: 'blocked' },
  { id: 2, email: 'test@test.com', ip: '10.0.0.50', attempts: 3, lastAttempt: '15m ago', status: 'monitoring' },
  { id: 3, email: 'hacker@evil.com', ip: '203.0.113.42', attempts: 12, lastAttempt: '1h ago', status: 'blocked' },
];

const rateLimits = [
  { endpoint: '/api/auth/login', limit: '20 req/15min', current: 8, status: 'normal' },
  { endpoint: '/api/auth/register', limit: '20 req/15min', current: 2, status: 'normal' },
  { endpoint: '/api/ai/roadmap', limit: '100 req/15min', current: 45, status: 'normal' },
  { endpoint: '/api/blog/posts', limit: '100 req/15min', current: 89, status: 'warning' },
];

export default function AdminSecurityPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">System</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Security</h1>
        <p className="text-muted-foreground mt-1 font-body">Monitor failed logins, blocked users, and suspicious activity.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Failed Logins" value="20" icon={<Lock size={18} />} color="destructive" />
        <StatCard title="Blocked IPs" value="3" icon={<Ban size={18} />} color="warning" />
        <StatCard title="Active Sessions" value="156" icon={<Activity size={18} />} color="primary" />
        <StatCard title="Suspicious" value="1" icon={<AlertTriangle size={18} />} color="warning" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="elevated" className="p-6">
          <h3 className="text-sm font-semibold mb-4">Failed Login Attempts</h3>
          <div className="space-y-3">
            {failedLogins.map((login) => (
              <div key={login.id} className="flex items-center justify-between rounded-xl border border-border/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                    <UserX size={14} className="text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{login.email}</p>
                    <p className="text-xs text-muted-foreground">{login.ip} - {login.attempts} attempts</p>
                  </div>
                </div>
                <Badge variant={login.status === 'blocked' ? 'destructive' : 'warning'} size="sm">
                  {login.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <h3 className="text-sm font-semibold mb-4">Rate Limits</h3>
          <div className="space-y-3">
            {rateLimits.map((rl) => (
              <div key={rl.endpoint} className="rounded-xl border border-border/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-xs font-mono text-muted-foreground">{rl.endpoint}</code>
                  <Badge variant={rl.status === 'warning' ? 'warning' : 'success'} size="sm">
                    {rl.current}/{parseInt(rl.limit)}
                  </Badge>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
                  <div
                    className={`h-full rounded-full transition-all ${
                      (rl.current / parseInt(rl.limit)) > 0.8 ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min((rl.current / parseInt(rl.limit)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
