'use client';

import { CategoryDistribution } from '../types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface CategoryDistributionChartProps {
  data: CategoryDistribution[] | undefined;
  isLoading: boolean;
}

const COLORS = ['#6366F1', '#818CF8', '#A78BFA', '#C084FC', '#E879F9', '#F472B6'];

export function CategoryDistributionChart({ data, isLoading }: CategoryDistributionChartProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
        <h3 className="font-semibold text-lg mb-4">Category Distribution</h3>
        <div className="h-64 bg-muted/30 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
      <h3 className="font-semibold text-lg mb-4">Category Distribution</h3>
      <div className="h-64">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="category"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No category data available
          </div>
        )}
      </div>
    </div>
  );
}
