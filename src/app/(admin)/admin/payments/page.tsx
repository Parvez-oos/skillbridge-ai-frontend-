'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatCard } from '@/features/admin/components/StatCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const transactions = [
  { id: 1, user: 'John Doe', email: 'john@example.com', amount: '$49.99', type: 'Subscription', status: 'completed', date: '2024-01-15' },
  { id: 2, user: 'Jane Smith', email: 'jane@example.com', amount: '$29.99', type: 'Course Purchase', status: 'completed', date: '2024-01-14' },
  { id: 3, user: 'Bob Wilson', email: 'bob@example.com', amount: '$99.99', type: 'Premium Plan', status: 'refunded', date: '2024-01-13' },
  { id: 4, user: 'Alice Brown', email: 'alice@example.com', amount: '$19.99', type: 'Course Purchase', status: 'completed', date: '2024-01-12' },
  { id: 5, user: 'Charlie Davis', email: 'charlie@example.com', amount: '$49.99', type: 'Subscription', status: 'pending', date: '2024-01-11' },
];

export default function AdminPaymentsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Commerce</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Payments</h1>
        <p className="text-muted-foreground mt-1 font-body">Revenue and transaction management.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$24,500" icon={<DollarSign size={18} />} color="success" />
        <StatCard title="This Month" value="$4,200" icon={<TrendingUp size={18} />} color="primary" />
        <StatCard title="Transactions" value="156" icon={<CreditCard size={18} />} color="info" />
        <StatCard title="Refunds" value="$890" icon={<ArrowDownRight size={18} />} color="destructive" />
      </motion.div>

      <motion.div variants={item}>
        <Card variant="elevated" className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{tx.user}</p>
                    <p className="text-xs text-muted-foreground">{tx.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{tx.amount}</td>
                  <td className="px-6 py-4 text-sm">{tx.type}</td>
                  <td className="px-6 py-4">
                    <Badge variant={tx.status === 'completed' ? 'success' : tx.status === 'refunded' ? 'destructive' : 'warning'} size="sm">
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
