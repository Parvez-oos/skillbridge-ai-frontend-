'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Construction } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const courses = [
  { id: 1, title: 'React Fundamentals', students: 1240, status: 'published', rating: 4.8, revenue: '$12,400' },
  { id: 2, title: 'Python for Data Science', students: 890, status: 'published', rating: 4.7, revenue: '$8,900' },
  { id: 3, title: 'TypeScript Mastery', students: 560, status: 'draft', rating: 0, revenue: '$0' },
  { id: 4, title: 'Node.js Backend', students: 720, status: 'published', rating: 4.6, revenue: '$7,200' },
  { id: 5, title: 'Machine Learning Basics', students: 430, status: 'archived', rating: 4.5, revenue: '$4,300' },
];

export default function AdminCoursesPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">Management</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Courses</h1>
        <p className="text-muted-foreground mt-1 font-body">Manage all courses on the platform.</p>
      </motion.div>

      <motion.div variants={item}>
        <Card variant="elevated" className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpen size={14} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{course.students}</td>
                  <td className="px-6 py-4 text-sm">{course.rating > 0 ? course.rating : '-'}</td>
                  <td className="px-6 py-4 text-sm font-medium">{course.revenue}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={course.status === 'published' ? 'success' : course.status === 'draft' ? 'secondary' : 'outline'}
                      size="sm"
                    >
                      {course.status}
                    </Badge>
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
